import { useState, useContext, useEffect } from "react";
import { Formik, ErrorMessage, Field, FieldArray } from "formik";
import {
  partnerOpportunitiesSchema,
  partnerOpportunitiesInitialValues,
  partnerOpportunitiesFormFields,
} from "../../utils/validationSchemas";
import { Button, ScreenLoader } from "../Common";
import DataContext from "../../context/DataContext";
import { addContracts, deleteContract, updateContract } from "../../services/Contracts";
import { getContractById, getContractsByBusinessId } from "../../services/Contracts";
import Select from "../Core/Select";
import { toast } from "react-toastify";
import { BsCheckCircle } from "react-icons/bs";
import OpportunityCard from "../OpportunityCard/OpportunityCard";
import close from "../../assets/image/svg/close.svg";
import { OpportunityTypes } from "../../utils/constants";

const PartnerOpportunitiesForm = () => {
  const [data, setData] = useState(partnerOpportunitiesInitialValues);
  const [partnerOpportunities, setPartnerOpportunities] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dataContext = useContext(DataContext);
  const business = dataContext.business;

  const handleEdit = (id) => {
    fetchData(id);
  };
  const handleDelete = async (id) => {
    try {
      await deleteContract(id);
      setPartnerOpportunities((stateValues) => stateValues.filter((opportunity) => opportunity.id !== id));
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleClose = () => {
    setData(partnerOpportunitiesInitialValues);
    setOpen(false);
  };
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setFormData(values);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getSelectedValue = (value, array) => {
    const foundedValue = array.find((element) => {
      return value === element.value;
    });

    if (foundedValue) {
      const index = array.indexOf(foundedValue);
      return index;
    }
    return 0;
  };
  const updateInfo = async () => {
    try {
      setLoading(true);
      let update = {};

      let { id, additionalResources, about: description, opportunityName: title, opportunityType: type } = formData;

      update = {
        id,
        description,
        additionalResources,
        title,
        type,
        businessId: business.id,
      };
      if (id) {
        await updateContract(id, update);
        const array = partnerOpportunities.map(({ ...opportunity }) => {
          if (opportunity.id === id) {
            opportunity.title = update.title;
            opportunity.description = update.description;
            opportunity.additionalResources = update.additionalResources;
            opportunity.type = update.type;
          }
          return opportunity;
        });
        setPartnerOpportunities(array);
        handleClose();
      } else {
        const newContractId = await addContracts(update);
        update.id = newContractId;
        setPartnerOpportunities([...partnerOpportunities, update]);
        handleClose();
      }
      toast("Profile changes were saved", {
        className: "bg-dark",
        bodyClassName: "text-white",
        icon: <BsCheckCircle color="#ffffff" size={30} />,
      });
    } catch (error) {
      setLoading(false);
      toast.error("There was an error while updating the profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function updateProfile() {
      updateInfo();
    }
    if (formData) {
      updateProfile();
    }
  }, [formData]);

  const fetchData = async (opportunityId) => {
    setBusinessLoading(true);
    const opportunityData = await getContractById(opportunityId);
    const { additionalResources, description: about, title: opportunityName, type: opportunityType, id } = opportunityData;

    setData((stateValues) => ({
      ...stateValues,
      additionalResources,
      about,
      opportunityName,
      opportunityType,
      id,
    }));
    setBusinessLoading(false);
  };

  useEffect(() => {
    async function setOpportunity() {
      const opportunities = await getContractsByBusinessId(business.id);
      setPartnerOpportunities(opportunities);
    }

    if (business) {
      setOpportunity();
      setBusinessLoading(false);
    }
  }, [business]);

  if (businessLoading) {
    return <ScreenLoader />;
  }
  return (
    <>
      {open || data?.id ? (
        <Formik initialValues={data} validationSchema={partnerOpportunitiesSchema} onSubmit={handleSubmit} enableReinitialize>
          {({ values, handleSubmit, setFieldValue }) => {
            return (
              <div className="form-group">
                <div className="row mt-8">
                  {partnerOpportunitiesFormFields.map(({ label, name, placeholder }) => {
                    {
                      return (
                        <div key={name} className={`mb-9 ${name === "about" ? "col-12" : "col-6"}`}>
                          <label htmlFor={name} className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                            {label}
                          </label>
                          {name === "opportunityType" ? (
                            <Select
                              name={name}
                              options={OpportunityTypes}
                              defaultValue={getSelectedValue(data?.type, OpportunityTypes)}
                              sendFilters={(option) => setFieldValue(name, option.value)}
                              isOptionDisabled={(option) => option.isDisabled}
                            />
                          ) : name === "about" ? (
                            <Field name={name} component="textarea" rows="4" className="form-control" placeholder={placeholder} />
                          ) : name === "additionalResources" ? (
                            <FieldArray
                              name={name}
                              render={(arrayHelpers) => (
                                <div>
                                  {values?.additionalResources && values?.additionalResources.length > 0
                                    ? values?.additionalResources.map((resource, index) => (
                                        <>
                                          <div key={index} className="d-flex flex-row justify-content-center align-items-center mt-5">
                                            {/** both these conventions do the same */}
                                            <Field name={`${name}[${index}]`} placeholder={placeholder} className="form-control" />

                                            <img
                                              src={close}
                                              alt="close"
                                              className="pointer ml-5"
                                              onClick={() => arrayHelpers.pop("")}
                                            />
                                          </div>
                                        </>
                                      ))
                                    : null}
                                  <div className="mt-7">
                                    <Button handleClick={() => arrayHelpers.push("")} text={"Add Resource"} small textUpperCase />
                                  </div>
                                </div>
                              )}
                            />
                          ) : (
                            <Field name={name} type="text" className="form-control " placeholder={placeholder} />
                          )}

                          <ErrorMessage name={name} component="div" className="text-danger" />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="mt-10 mb-18">
                  <Button handleClick={handleSubmit} text="Save Opportunity" dark medium textUpperCase loading={loading} />

                  <Button handleClick={handleClose} text="Cancel" medium textUpperCase otherClass={"ml-5"} />
                </div>
              </div>
            );
          }}
        </Formik>
      ) : (
        <Button handleClick={() => setOpen(true)} text="+ Add opportunity" dark medium textUpperCase otherClass="mb-7" />
      )}

      <div className="row border-top-theme-dashed">
        <div className="col-12">
          <div className="row mt-5">
            {partnerOpportunities.map((opp, idx) => (
              <OpportunityCard
                key={idx}
                id={opp.id}
                type={opp.type}
                description={opp.description}
                title={opp.title}
                additionalResources={opp.additionalResources}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerOpportunitiesForm;

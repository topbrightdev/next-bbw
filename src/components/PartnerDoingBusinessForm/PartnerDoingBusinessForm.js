import { useState, useContext, useEffect } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import {
  partnerDoingBusinessFormFields,
  partnerDoingBusinessSchema,
  partnerDoingBusinessInitialValues,
} from "../../utils/validationSchemas";
import { Button, ScreenLoader } from "../Common";
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";
import { BsCheckCircle } from "react-icons/bs";
import { getSolicitationRequirementByBusinessId, updateSolicitationRequirement } from "../../services/SolicitationRequirement";
const PartnerDoingBusinessForm = () => {
  const [data, setData] = useState(partnerDoingBusinessInitialValues);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(true);
  const dataContext = useContext(DataContext);
  const business = dataContext.business;

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
  const updateInfo = async () => {
    try {
      setLoading(true);
      let update = {};

      let { doing_business: description, solicitationRequirementId } = formData;

      update = {
        description,
      };
      await updateSolicitationRequirement(solicitationRequirementId, update);
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

  const fetchData = async () => {
    const { description: doing_business, id: solicitationRequirementId } = {
      ...(await getSolicitationRequirementByBusinessId(business.id)),
    };
    setData((stateValues) => ({
      ...stateValues,
      solicitationRequirementId,
      doing_business,
    }));
    setBusinessLoading(false);
  };

  useEffect(() => {
    if (business) {
      fetchData();
    }
  }, [business]);

  if (businessLoading) {
    return <ScreenLoader />;
  }
  return (
    <>
      <Formik initialValues={data} validationSchema={partnerDoingBusinessSchema} onSubmit={handleSubmit} enableReinitialize>
        {({
          // values,
          // errors,
          // touched,
          // handleChange,
          handleSubmit,
          // setFieldValue,
        }) => {
          return (
            <div className="form-group">
              <div className="row mt-4">
                {partnerDoingBusinessFormFields.map(({ label, name, placeholder }) => {
                  {
                    return (
                      <div key={name} className="mb-9 col-12">
                        <label htmlFor={name} className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                          {label}
                        </label>
                        <Field name={name} component="textarea" rows="7" className="form-control" placeholder={placeholder} />

                        <ErrorMessage name={name} component="div" className="text-danger" />
                      </div>
                    );
                  }
                })}
              </div>
              <div className="mt-10">
                <Button handleClick={handleSubmit} text="Update Profile" dark medium textUpperCase loading={loading} />
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default PartnerDoingBusinessForm;

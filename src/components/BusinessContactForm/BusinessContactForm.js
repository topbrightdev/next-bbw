import { useState, useContext, useEffect } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import {
  businessContactInfoInitialValues,
  businessContactInfoSchema,
  businessContactInfoFormFields,
} from "../../utils/validationSchemas";
import { Button, ScreenLoader } from "../Common";
import DataContext from "../../context/DataContext";
import { getEmailById, updateEmail, addEmailInBusiness } from "../../services/Email";
import { getPhoneById, updatePhoneNumber, addPhoneInBusiness } from "../../services/Phone";
import Select from "../Core/Select";
import { toast } from "react-toastify";
import { BsCheckCircle } from "react-icons/bs";

const BusinessOverViewForm = () => {
  const [data, setData] = useState(businessContactInfoInitialValues);
  const [businessLoading, setBusinessLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const dataContext = useContext(DataContext);
  const business = dataContext.business;
  const states = dataContext.states;
  const cities = dataContext.cities;
  const getState = () => {
    const foundedValue = states.find((element) => {
      return selectedState === element.isoCode;
    });
    if (foundedValue) {
      const index = states.indexOf(foundedValue);
      return index;
    }
    return 0;
  };
  const getCitiesOfState = () => {
    const result = cities.filter((element) => {
      return selectedState === element.stateCode;
    });

    return result;
  };
  const getCity = () => {
    const result = getCitiesOfState();
    const foundedValue = result.find((element) => {
      return selectedCity === element.name;
    });
    if (foundedValue) {
      const index = result.indexOf(foundedValue);
      return index;
    }
    return 0;
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
  const updateInfo = async () => {
    try {
      setLoading(true);

      let { email, phone } = formData;
      if (phone !== data.phone) {
        if (data.phone && business.phone[0]) await updatePhoneNumber(business.phone[0], phone);
        else
          await addPhoneInBusiness({
            phone,
            parentId: business.id,
            parentType: "BUSINESS",
          });
      }
      if (email !== data.email) {
        if (data.email && business.email[0]) await updateEmail(business.email[0], email);
        else
          await addEmailInBusiness({
            phone,
            parentId: business.id,
            parentType: "BUSINESS",
          });
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

  const fetchData = async () => {
    const { email: emailList, phone: phoneList, city, state, website } = business;
    const [emailId] = Array.isArray(emailList) ? emailList : [];
    const [phoneId] = Array.isArray(phoneList) ? phoneList : [];
    const [emailResponse, phoneResponse] = await Promise.all([getEmailById(emailId), getPhoneById(phoneId)]);
    setData((stateValues) => ({
      ...stateValues,
      city,
      state,
      website,
      email: emailResponse?.email || "",
      phone: phoneResponse?.phone || "",
    }));
    setSelectedState(state);
    setSelectedCity(city);
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
      <Formik initialValues={data} validationSchema={businessContactInfoSchema} onSubmit={handleSubmit} enableReinitialize>
        {({ handleSubmit, setFieldValue }) => {
          return (
            <div className="form-group">
              <div className="row mt-8">
                {businessContactInfoFormFields.map(({ label, name, placeholder }) => {
                  {
                    return (
                      <div key={name} className="mb-9 col-6">
                        <label htmlFor={name} className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                          {label}
                        </label>

                        {name === "state" ? (
                          <Select
                            name={name}
                            options={states}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.isoCode}
                            defaultValue={getState()}
                            sendFilters={(option) => {
                              setSelectedState(option.isoCode);
                              setSelectedCity("");
                              setFieldValue(name, option.isoCode);
                            }}
                          />
                        ) : name === "city" ? (
                          <Select
                            name={name}
                            options={getCitiesOfState()}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.name}
                            defaultValue={getCity()}
                            sendFilters={(option) => setFieldValue(name, option.name)}
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

export default BusinessOverViewForm;

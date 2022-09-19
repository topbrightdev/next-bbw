//PACKAGES
import { useState, useContext, useEffect, useMemo } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import { toast } from "react-toastify";
//COMPONENTS
import { Button, ScreenLoader } from "../Common";
import Select from "../Core/Select";
import ModalUploadPhoto from "@components/ModalUploadPhoto";
//SERVICES
import { updateBusiness } from "../../services/Business";
import { getProfileAvatarUrl } from "@services/Storage";
//VALIDATION_SCHEMAS
import { businessSnapShotSchema, businessSnapShotInitialValues, businessSnapShotFormFields } from "../../utils/validationSchemas";
//ICONS
import { BsCheckCircle } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
// @CONTEXT
import DataContext from "../../context/DataContext";
import GlobalContext from "../../context/GlobalContext";
// @IMAGES
import userAvatar from "../../assets/image/svg/avatar-user.svg";
import { DefaultValues } from "@utils/constants";

const BusinessOverViewForm = () => {
  //STATE
  const [data, setData] = useState(businessSnapShotInitialValues);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(true);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  //CONTEXT API
  const { businessWithDetails, refreshBusinessData, business } = useContext(DataContext);
  const globalContext = useContext(GlobalContext);

  //USE_EFFECTs

  useEffect(() => {
    if (businessWithDetails?.mediaId?.source && !currentAvatar) {
      fetchAvatar();
    }
  }, [businessWithDetails]);

  useEffect(() => {
    async function updateProfile() {
      updateInfo();
    }
    if (formData) {
      updateProfile();
    }
  }, [formData]);

  useEffect(() => {
    if (business) {
      fetchData();
    }
  }, [business]);

  //EVENT_HANDLERS
  const yearsArray = () => {
    const year = new Date().getFullYear();
    let array = [];
    for (let iterator = 1900; iterator <= year; iterator++) {
      let object = {};
      object.label = iterator.toString();
      object.value = iterator.toString();
      array.push(object);
    }
    return array;
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

      let { president: owner_name, yearFounded } = formData;

      update = {
        owner_name,
        yearFounded,
      };
      await updateBusiness(business.id, update);
      toast("Profile changes were saved", {
        className: "bg-dark",
        bodyClassName: "text-white",
        icon: <BsCheckCircle color="#ffffff" size={30} />,
      });
    } catch (error) {
      setLoading(false);
      toast.error("There was an error while updating the profile");
      await refreshBusinessData();
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchAvatar = async () => {
    const avatar = await getProfileAvatarUrl(businessWithDetails.mediaId.source, DefaultValues.BUSINESS);

    setCurrentAvatar(avatar);
  };
  const handleUploadImage = () => {
    globalContext.toggleUploadImageModal();
  };

  const fetchData = async () => {
    const { owner_name: president, yearFounded } = business;
    setData((stateValues) => ({
      ...stateValues,
      president,
      yearFounded,
    }));
    setBusinessLoading(false);
  };
  //OTHERS
  const YEARS = useMemo(() => {
    return yearsArray();
  }, [business]);
  if (businessLoading) {
    return <ScreenLoader />;
  }
  return (
    <>
      <Formik initialValues={data} validationSchema={businessSnapShotSchema} onSubmit={handleSubmit} enableReinitialize>
        {({ handleSubmit, setFieldValue }) => {
          return (
            <div className="form-group">
              <div className="mt-10 d-flex align-items-end">
                <ModalUploadPhoto
                  type={DefaultValues.BUSINESS}
                  userId={businessWithDetails?.id}
                  onChange={(image) => {
                    setCurrentAvatar(image);
                    setFieldValue("mediaId", image);
                  }}
                  mediaId={businessWithDetails?.mediaId?.id}
                />
                <img className="profile-settings-avatar" src={currentAvatar || userAvatar} alt="user-icon" />

                <button className="profile-settings-avatar-edit" onClick={handleUploadImage}>
                  <MdEdit size={30} className="text-dark" />
                </button>
              </div>
              <div className="row mt-8">
                {businessSnapShotFormFields.map(({ label, name, placeholder }) => {
                  {
                    return (
                      <div key={name} className="mb-9 col-6">
                        <label htmlFor={name} className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                          {label}
                        </label>
                        {name === "yearFounded" ? (
                          <Select
                            name={name}
                            options={YEARS}
                            defaultValue={getSelectedValue(data.yearFounded, YEARS)}
                            sendFilters={(option) => setFieldValue(name, option.value)}
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

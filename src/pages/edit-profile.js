// @PACKAGES
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { isEqual } from "lodash/lang";
import { MdEdit } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

// @COMPONENTS
import { BBWOtpInput } from "@components/Common";
import ModalUploadPhoto from "@components/ModalUploadPhoto";
import Button from "@components/Common/Button";
import InputField from "@components/Common/InputField";
import { LoggedInLayout } from "@components/Layout";

// @SERVICES
import { updatePhoneNumber, addPhoneInUser } from "../services/Phone";
import { updateUser } from "../services/User";
import { getProfileAvatarUrl } from "../services/Storage";

// @CONTEXT
import DataContext from "../context/DataContext";
import GlobalContext from "./../context/GlobalContext";

// @IMAGES
import userAvatar from "../assets/image/svg/avatar-user.svg";

// @UTILS
import { profileSettingsFormFields, profileSettingsValidationSchema } from "../utils/validationSchemas";

// @CONFIG
import { auth } from "../config/firebase";
import { DefaultValues } from "@utils/constants";

const EditProfile = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingOtpRes, setLoadingOtpRes] = useState(false);
  const [otpErrors, setOtpErrors] = useState("no error");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const { currentUserWithDetails: cuwd, refreshUserData } = useContext(DataContext);
  const globalContext = useContext(GlobalContext);

  const currentUserWithDetails = {
    ...cuwd,
    email: cuwd?.email?.[0]?.email || "",
    phone: cuwd?.phone?.[0]?.phone || "",
  };

  const handleUploadImage = () => {
    globalContext.toggleUploadImageModal();
  };

  const toggleOtpModal = (_) => setShowOtpModal((state) => !state);

  const sendOtp = async (_) => {
    if (currentUserWithDetails.email) {
      await axios.post("/api/send-otp-email", {
        email: currentUserWithDetails.email,
      });
    } else {
      // @TODO: show error toast
    }
  };

  const handleSubmitOtp = async (otp) => {
    try {
      setOtpErrors("no error");
      setLoadingOtpRes(true);
      const {
        data: { token },
      } = await axios.post("/api/update-email", {
        otp,
        email: currentUserWithDetails.email,
        newEmail: formData.email,
      });
      auth.signInWithCustomToken(token);
      setShowOtpModal(false);
      updateInfo();
    } catch (error) {
      setOtpErrors("Invalid otp");
    } finally {
      setLoadingOtpRes(false);
    }
  };

  const fetchAvatar = async () => {
    const avatar = await getProfileAvatarUrl(currentUserWithDetails.mediaId.source, DefaultValues.USER);
    setCurrentAvatar(avatar);
  };

  useEffect(() => {
    async function updateProfile() {
      // @TODO: do we need a check for currentUserWithDetails.email (isArray, length etc?)
      if (formData.email !== currentUserWithDetails.email) {
        await sendOtp();
        setShowOtpModal(true);
        return;
      } else {
        updateInfo();
      }
    }
    if (formData) {
      updateProfile();
    }
  }, [formData]);

  useEffect(() => {
    if (currentUserWithDetails?.mediaId?.source && !currentAvatar) {
      fetchAvatar();
    }
  }, [currentUserWithDetails]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setFormData(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateInfo = async () => {
    try {
      setLoading(true);
      let update = {};
      const { firstName, lastName, phone } = formData;

      if (!isEqual({ firstName, lastName }, currentUserWithDetails)) update = { ...update, firstName, lastName };
      if (phone !== currentUserWithDetails.phone) {
        if (currentUserWithDetails.phone) {
          await updatePhoneNumber(cuwd.phone[0].id, phone);
        } else {
          await addPhoneInUser({
            phone,
            parentId: currentUserWithDetails.id,
            parentType: "USER",
          });
        }
      }

      if (Object.keys(update).length) await updateUser(currentUserWithDetails.id, update);
      toast("Profile changes were saved", {
        className: "bg-dark",
        bodyClassName: "text-white",
        icon: <BsCheckCircle color="#ffffff" size={30} />,
      });
      await refreshUserData();
    } catch (error) {
      toast.error("There was an error while updating the profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoggedInLayout>
      <div className="row">
        <Formik
          initialValues={currentUserWithDetails}
          validationSchema={profileSettingsValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => {
            return (
              <div className="m-5">
                <div className="p-5 px-10 bg-light">
                  <p className="text-dark m-0 font-weight-bold">Profile Settings</p>
                </div>

                <ModalUploadPhoto
                  userId={currentUserWithDetails?.id}
                  onChange={(image) => {
                    setCurrentAvatar(image);
                    setFieldValue("mediaId", image);
                  }}
                  mediaId={currentUserWithDetails?.mediaId?.id}
                />

                <div className="pt-5 px-10 shadow pb-20">
                  <div className="mt-10 d-flex align-items-end">
                    <img className="profile-settings-avatar" src={currentAvatar || userAvatar} alt="user-icon" />

                    <button className="profile-settings-avatar-edit" onClick={handleUploadImage}>
                      <MdEdit size={30} className="text-dark" />
                    </button>
                  </div>
                  <div className="mt-20">
                    <div className="row">
                      {profileSettingsFormFields.map(({ label, name, props }) => {
                        return (
                          <div key={label} className="col-6 mt-10 px-8">
                            <p className="font-weight-bold text-dark m-0">{label}</p>
                            <InputField
                              name={name}
                              placeholder={label}
                              value={values[name]}
                              onChange={handleChange}
                              disabled={loading}
                              {...props}
                            />

                            {errors[name] && touched[name] && <div className="text-danger">{errors[name]}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-20 ml-4">
                    <Button handleClick={handleSubmit} text="Update Profile" dark medium textUpperCase loading={loading} />
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
        <Modal show={showOtpModal} onHide={toggleOtpModal}>
          <BBWOtpInput
            email={currentUserWithDetails.email}
            errors={otpErrors}
            loading={loadingOtpRes}
            setLoading={setLoadingOtpRes}
            onSubmit={handleSubmitOtp}
          />
        </Modal>
      </div>
    </LoggedInLayout>
  );
};

export default EditProfile;

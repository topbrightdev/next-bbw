//PACKAGES
import { FC, useState, useEffect } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
//UTILS
import { emailValidationSchema } from "@utils/validationSchemas";
import { DefaultValues, otpBypassAccounts } from "@utils/constants";
//CONFIG
import { auth } from "@config/firebase.js";
//COMPONENTS
import { Loader } from "@components/Common";
//SERVICES
import { getProfileAvatarUrl } from "@services/Storage";

//INTERFACES
interface SignInProps {
  onSubmitEmail(email: string): any;
  handleRequestDemo(): any;
  isInvited: boolean;
  businessData: any;
  userData: any;
}

const SignIn: FC<SignInProps> = ({ onSubmitEmail, handleRequestDemo, isInvited, businessData, userData }) => {
  //STATE
  const [errors, setErrors] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [businessLogo, setBusinessLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDev, setIsDevelopment] = useState(false);

  //USE_EFFECT
  useEffect(() => {
    const flag = !window.location.hostname.startsWith("blackbusinesswarehouse");
    setIsDevelopment(flag);
  }, []);
  useEffect(() => {
    if (isInvited && businessData && userData) {
      fetchAvatar(businessData?.mediaId?.source, DefaultValues.BUSINESS);
      fetchAvatar(userData?.mediaId?.source, DefaultValues.USER);
    }
  }, [isInvited, businessData, userData]);
  //EVENT_HANDLERS
  const fetchAvatar = async (source: string, type: string) => {
    if (type === DefaultValues.USER) {
      const avatar = await getProfileAvatarUrl(source, DefaultValues.USER);
      setUserAvatar(avatar);
    } else {
      const logo = await getProfileAvatarUrl(source, DefaultValues.BUSINESS);
      setBusinessLogo(logo);
    }
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    const methods = (await auth.fetchSignInMethodsForEmail(values.email)).length;
    if (!methods) {
      setErrors(null);
      setErrors({ email: "No account with email" });
    } else {
      // The following check was added to bypass otp for selected emails
      if (!isDev || !otpBypassAccounts.includes(values.email.toLowerCase())) {
        await fetch("/api/send-otp-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
          }),
        });
      }
      onSubmitEmail(values.email);
    }
    setLoading(false);
  };

  return (
    <div
      className={` col-sm-12 px-md-7 px-0 pb-6 d-flex flex-column bg-white overflow-hidden ${
        isInvited ? "col-l-5 col-md-5 mt-2" : "col-l-6 col-md-6 mt-11"
      }`}
    >
      <div className="px-20 pt-20 h-100">
        {isInvited ? (
          <>
            <h5 className="font-size-9 line-height-reset pb-md-8 line-height-1p4">
              Welcome to the team! <br></br> You were invited by:
            </h5>
            <div className="border-dashed rounded-lg px-10 py-5 border-dashed-1px d-flex flex-row">
              {userAvatar ? (
                <div className="d-flex align-items-center justify-content-center ">
                  <img className="rounded-circle object-cover" alt="avatar" src={userAvatar} width="80" height="80" id="avatarImage" />
                </div>
              ) : null}

              <div className="d-flex align-items-center justify-content-center ml-10">
                <h5 className="font-size-8">
                  {userData?.firstName} {userData?.lastName}
                </h5>
              </div>
            </div>
            <div className="border-dashed rounded-lg px-10 py-5 border-dashed-1px d-flex flex-row mt-8">
              <div className="d-flex align-items-center justify-content-center ">
                {businessLogo ? (
                  <div className="bg-white border-2px rounded-3 p-3">
                    <img className=" object-contain" alt="avatar" src={businessLogo} width="55" height="55" id="avatarImage" />
                  </div>
                ) : null}
              </div>
              <div className="d-flex align-items-center justify-content-center ml-10 ">
                <h5 className="font-size-8 text-break line-height-1">{businessData?.name}</h5>
              </div>
            </div>
          </>
        ) : null}

        {isInvited ? (
          <h5 className="font-size-9 line-height-reset pb-md-5 line-height-1p4 mt-15">Login to accept invite</h5>
        ) : (
          <h5 className="font-size-9 line-height-reset pb-md-5 line-height-1p4">
            Login to search for high-quality Black-owned-businesses
          </h5>
        )}

        <div className="pt-6 pb-md-9">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleSubmit}
            initialErrors={errors}
            enableReinitialize
          >
            <Form>
              <div className="form-group">
                <label
                  htmlFor="email"
                  className={`font-size-5  font-weight-semibold line-height-reset ${errors ? "text-danger" : "text-black-2"}`}
                >
                  Email
                </label>
                <Field name="email" type="email" className={`form-control ${errors ? "border-color-red" : ""}`} placeholder="Email" />
                {/* @ts-ignore */}
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group mt-18 mb-md-8">
                <button
                  type="submit"
                  className={`btn btn-primary btn-medium rounded-5 text-center text-uppercase py-9 ${isInvited ? "w-100" : "w-40"}`}
                  disabled={loading}
                >
                  {/* @ts-ignore */}
                  {loading ? <Loader loading /> : isInvited ? "Login" : "continue with email"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {isInvited ? null : (
        <p className="font-size-5 heading-default-color px-20 mb-15">
          Not a member?{" "}
          <a className="h6 text-primary" onClick={handleRequestDemo}>
            <u>Request a demo</u>
          </a>
        </p>
      )}
    </div>
  );
};

export default SignIn;

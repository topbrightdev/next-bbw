import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";

import loginImage from "../../assets/image/l3/png/loginImage.png";
import { auth } from "../../config/firebase.js";
import { Loader } from "../Common";
import { otpBypassAccounts } from "@utils/constants";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
});

const SignIn = ({ onSubmitEmail, handleRequestDemo }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDev, setIsDevelopment] = useState(false);
  useEffect(() => {
    const flag = !window.location.hostname.startsWith("blackbusinesswarehouse");
    setIsDevelopment(flag);
  }, []);

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
    <div className="login-modal-main bg-white rounded-left-5 overflow-hidden">
      <div className="row no-gutters">
        <div className="col-md-7 col-xs-12">
          <div className="pt-10 pb-3 pl-11 pr-12  h-100 d-flex flex-column ">
            <div className="pb-md-5">
              <h5 className="font-size-7 line-height-reset pb-md-4 line-height-1p4">
                Login to search for high-quality Black-owned-businesses
              </h5>
            </div>

            <div className="pt-6 pb-md-9">
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialErrors={errors}
                enableReinitialize
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="email" className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                      Email
                    </label>
                    <Field name="email" type="email" className="form-control" placeholder="Email" />

                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="form-group mt-14 mb-md-8">
                    <button
                      type="submit"
                      className="btn btn-primary btn-medium w-75 rounded-5 text-center text-uppercase py-9"
                      disabled={loading}
                    >
                      {loading ? <Loader loading /> : "continue with email"}
                    </button>
                  </div>
                  <p className="font-size-4 heading-default-color pt-md-6">
                    Not a member?{" "}
                    <a className="h6 text-primary" onClick={handleRequestDemo}>
                      <u>Request a demo</u>
                    </a>
                  </p>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-xs-12">
          <div className="bg-white-2 login-modal-image-container object-cover w-100 h-100">
            <img src={loginImage} alt="login"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

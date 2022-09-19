import React, { useState } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import { Loader } from "../Common";
import smallBrandWithDescriptionLogo from "../../assets/image/l3/png/smallBrandWithDescriptionLogo.png";

const validationSchema = Yup.object().shape({
  type: Yup.string(),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
  title: Yup.string().required("Job title is required"),
  goal: Yup.string().required("Goal is required"),
  website: Yup.string().when("type", {
    is: "business",
    then: Yup.string().required("Website is required"),
  }),
});

const ScheduleForm = ({ accountType, handleSubmitEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let message = "Someone made a request, following are the details";
      for (let value in values) {
        message += value + ":" + values[value];
      }
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "support@blackbusinesswarehouse.com",
          receiver: "monquize@dusseauand.com",
          subject: "Someone want an appointment",
          message: message,
        }),
      });

      handleSubmitEmail();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div className="border-top-dashed">
        <img className="mt-5 mx-auto d-block" src={smallBrandWithDescriptionLogo} />
        <p className="font-size-4 text-black-2 font-weight-bold mt-5 text-center">
          Hey, {accountType == "business" ? "Black business owner" : "potential Partner"}!<br></br> Please fill out the form below to
          request a demo
        </p>
      </div>
      <div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            title: "",
            goal: "",
            type: accountType,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>
            <div className="form-group">
              <div>
                <label htmlFor="name" className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Your Name
                </label>
                <Field name="name" type="text" className="form-control" placeholder="Full Name" />

                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div>
                <label htmlFor="email" className="font-size-4 text-black-2 font-weight-semibold line-height-reset mt-4">
                  Email
                </label>
                <Field name="email" type="email" className="form-control" placeholder="Email" />

                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div>
                <label htmlFor="title" className="font-size-4 text-black-2 font-weight-semibold line-height-reset mt-4">
                  Title
                </label>
                <Field name="title" type="text" className="form-control" placeholder="Job title" />

                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>
              {accountType == "business" ? (
                <div>
                  <label htmlFor="website" className="font-size-4 text-black-2 font-weight-semibold line-height-reset mt-4">
                    Website
                  </label>
                  <Field name="website" type="text" className="form-control" placeholder="Website link" />

                  <ErrorMessage name="website" component="div" className="text-danger" />
                </div>
              ) : null}

              <div>
                <label htmlFor="goal" className="font-size-4 text-black-2 font-weight-semibold line-height-reset mt-4">
                  Goal
                </label>
                <Field name="goal" className="form-control" placeholder="Goal" component="textarea" rows="3" />

                <ErrorMessage name="goal" component="div" className="text-danger" />
              </div>
            </div>

            <div className="form-group mt-14 mb-8">
              <button
                type="submit"
                className="btn btn-primary btn-medium w-100 rounded-5 text-center py-9 font-size-5"
                disabled={loading}
              >
                {loading ? <Loader loading /> : "Request a call"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default ScheduleForm;

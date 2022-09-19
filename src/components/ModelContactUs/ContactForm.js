import { useState } from "react";
import { Loader } from "../Common";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import logoSmall from "../../assets/image/l3/png/Logo-small.png";

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is requried"),
});
const ContactForm = ({ handleSubmitEmail, receiverEmail, userEmail }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "support@blackbusinesswarehouse.com",
          receiver: receiverEmail,
          subject: "Someone want an appointment",
          message: `Subject: ${values.subject} , Message: ${values.message} , Who contacted: ${userEmail}`,
        }),
      });
      handleSubmitEmail();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white overflow-hidden">
      <div className="row no-gutters">
        <div className="col-l-12 col-md-12 col-sm-12 pt-11 px-md-12 px-0 pb-6 d-flex flex-column py-10">
          <img className="mb-8" src={logoSmall} alt="black-business-warehouse" height="60px" width="60px" />

          <h5 className="font-size-7 text-black-2 line-height-reset pb-md-4 line-height-1p4">Contact Us</h5>

          <div>
            <Formik
              initialValues={{
                subject: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              <Form>
                <div className="form-group">
                  <div>
                    <label htmlFor="subject" className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                      Subject
                    </label>
                    <Field name="subject" type="text" className="form-control" placeholder="Enter Subject" />

                    <ErrorMessage name="subject" component="div" className="text-danger" />
                  </div>
                  <div className="mt-5">
                    <label htmlFor="message" className="font-size-4 text-black-2 font-weight-semibold line-height-reset mt-4">
                      Message
                    </label>
                    <Field name="message" className="form-control" placeholder="Enter Message" component="textarea" rows="5" />

                    <ErrorMessage name="message" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="form-group mt-10 ">
                  <button
                    type="submit"
                    className="btn btn-primary btn-medium w-100 rounded-5 text-center text-uppercase py-9 font-size-3"
                    disabled={loading}
                  >
                    {loading ? <Loader loading /> : "Send Now"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

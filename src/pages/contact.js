import React, { useState, useEffect } from "react";

import { LoggedInLayout } from "@components/Layout";

const Contact = (props) => {
  const { data } = props;
  const [name, setName] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Enter subject");
  const [placeholder, setPlaceholder] = useState("Type your message here.");
  const [sent, setSent] = useState(false);

  const setFormValues = (e) => {
    const target = e.target;
    switch (target.name) {
      case "name":
        setName(target.value);
        break;
      case "sender":
        setSender(target.value);
        break;
      case "message":
        setMessage(target.value);
        break;
      case "subject":
        setSubject(target.value);
        break;
      default:
        return null;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    // @TODO: Move the following fetch call to appropriate service function
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: sender,
        subject: `Message from ${name}: ${subject}`,
        receiver: receiver,
        message: message,
      }),
    })
      .then((data) => {
        setSent(data.ok);
      })
      .then((_) => {
        setTimeout(() => {
          setSent(false);
        }, 2000);
      })
      .catch((err) => console.error("ERROR", err));
  };

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== "production";
    if (data) {
      // @TODO: where is this data coming from? what is the expected content in this data?
      const sendTo = data.email || data.contact_email;
      setReceiver(sendTo);
      const interestedIn = data.title || data.business_name;
      setPlaceholder(`Type your message here to learn more about ${interestedIn}`);
    } else {
      setReceiver("contact@blackbusinesswarehouse.com");
    }
    if (isDev) {
      setReceiver("mkdusseau@gmail.com");
    }
  }, []);

  return (
    <LoggedInLayout>
      <div className="row justify-content-center ">
        <div className="col-xxl-7 col-xl-9 col-lg-10">
          <h2 className="font-size-9 text-center mt-5 mb-11">Contact Us</h2>
          <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
            <form
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={submitForm}
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              {sent && (
                <div data-aos="fade-right" data-aos-duration="1000">
                  Message sent!
                </div>
              )}
              {/* You still need to add the hidden input with the form name to your JSX form */}
              {!sent && (
                <>
                  <input type="hidden" name="form-name" value="contact" data-aos="fade-right" data-aos-duration="1000" />
                  <div className="row" data-aos="fade-right" data-aos-duration="1000">
                    <div className="col-12 mb-7">
                      <label htmlFor="name" className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        id="name"
                        name="name"
                        required
                        onChange={setFormValues}
                      />
                    </div>
                    <div className="col-lg-6 mb-7">
                      <label htmlFor="email" className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">
                        E-mail
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="example@company.com"
                        id="sender"
                        name="sender"
                        required
                        onChange={setFormValues}
                      />
                    </div>
                    <div className="col-lg-6 mb-7">
                      <label htmlFor="subject" className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter subject"
                        id="subject"
                        name="subject"
                        required
                        onChange={setFormValues}
                      />
                    </div>
                    <div className="col-lg-12 mb-7">
                      <label htmlFor="message" className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder={`${placeholder}`}
                        className="form-control h-px-144"
                        name="message"
                        required
                        onChange={setFormValues}
                      ></textarea>
                    </div>
                    <div className="col-lg-12 pt-4">
                      <button type="submit" className="btn btn-primary text-uppercase w-100 h-px-48">
                        Send Now
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
            <div className="mt-8">
              <h3 className="font-size-4">Contact Information</h3>
              <div className="media mb-2">
                <div className="mr-6">
                  <i className="fas fa-map-marker-alt mt-2"></i>
                </div>
                <p className="font-size-4 mb-0">Seattle, WA</p>
              </div>
              <div className="media mb-2">
                <div className="mr-6">
                  <i className="fas fa-phone-alt mt-2"></i>
                </div>
                <p className="font-size-4 mb-0">206-930-8830</p>
              </div>
              <div className="media mb-2">
                <div className="mr-6">
                  <i className="fas fa-envelope mt-2"></i>
                </div>
                <p className="font-size-4 mb-0 pr-3">support@blackbusinesswarehouse.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export default Contact;

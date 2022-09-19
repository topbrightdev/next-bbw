import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";

const Contact = () => {
  // const { to, from } = props;
  // const gContext = useContext(GlobalContext);
  // const [name, setName] = useState("");
  // const [receiver, setReceiver] = useState("");
  // const [sender, setSender] = useState("");
  // const [message, setMessage] = useState("");
  // const [subject, setSubject] = useState("Enter subject");
  const [placeholder, setPlaceholder] = useState("Type your message here.");
  const [sent] = useState(false);

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

  const submitForm = (_) => {
    // e.preventDefault();
    // fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     sender: sender,
    //     subject: subject,
    //     receiver: receiver,
    //     message: message,
    //   }),
    // })
    //   .then((data) => {
    //     setSent(data.ok);
    //   })
    //   .then((res) => {
    //     setTimeout(() => {
    //       setSent(false);
    //     }, 2000);
    //   })
    //   .catch((err) => console.log('ERROR', err));
  };

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== "production";
    if (data) {
      const sendTo = data.email || data.contact_email;
      setReceiver(sendTo);
      if (isDev) {
        setReceiver("mkdusseau@gmail.com");
      }
      const interestedIn = data.title || data.business_name;
      setPlaceholder(`Type your message here to learn more about ${interestedIn}`);
    }
  }, []);

  return (
    <>
      <PageWrapper>
        <div className="bg-default-1 pt-16 pb-12 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-7 col-xl-9 col-lg-10">
                <h2 className="font-size-9 text-center mb-11">Contact Us</h2>
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
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export async function getServerSideProps(context) {
  if (Object.keys(context.query)[0]) {
    const collection = Object.keys(context.query)[0];
    const collectionId = context.query[collection];
    const data = await db
      .collection(`${collection}`)
      .doc(`${collectionId}`)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        data["id"] = collectionId;
        return data;
      })
      .catch((err) => console.error("ERROR", err));

    return {
      props: { data }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}

export default Contact;

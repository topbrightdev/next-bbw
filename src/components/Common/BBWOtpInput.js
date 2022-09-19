import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { FcCheckmark } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import axios from "axios";
import logoSmall from "../../assets/image/l3/png/Logo-small.png";
import Loader from "./Loader";

const BBWOtpInput = ({ onSubmit, errors, loading, setLoading, email }) => {
  const [otp, setOtp] = useState("");
  const handleChange = (otp) => setOtp(otp);

  const handleSendCodeAgain = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("/api/send-otp-email", { email });
    setLoading(false);
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="row no-gutters">
        <div className="col-l-12 col-md-12 col-sm-12 pt-11 px-md-7 px-0 pb-6 d-flex flex-column ">
          <div className="pb-5 pl-10 ">
            <img className="mb-5" src={logoSmall} alt="black-business-warehouse" height="60px" width="60px" />
            <h5 className="font-size-7 pt-10 line-height-reset line-height-1p4">We emailed you a code</h5>
            <p className="font-size-4 heading-default-color pt-6">Enter in the verification code sent to:</p>
            <p className="-2 font-weight-semibold font-size-4 text-primary ">{email}</p>
            <div className="text-black-2 font-weight-semibold font-size-5 text-primary ">Enter the verification code:</div>
            <div className="my-4 d-flex">
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                inputStyle={{
                  height: "3rem",
                  marginRight: "1rem",
                  fontSize: "2rem",
                  borderBottom: `1px solid ${errors === "Incorrect code. Please try again" ? "red" : "black"}`,
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: "none",
                }}
                focusStyle={{
                  outline: "none",
                }}
              />
              <div className="d-flex align-items-center justify-content-center">
                {errors !== "no error" ? errors === "" ? <FcCheckmark size={20} /> : <ImCross color={"red"} size={20} /> : ""}
              </div>
            </div>
            <span className="text-danger mt-1">{errors !== "no error" ? (errors === "" ? "" : errors) : ""}</span>
          </div>

          <div className="form-group mt-14 mb-8 mx-9">
            <button
              onClick={(_) => onSubmit(otp)}
              type="submit"
              className="btn btn-primary btn-medium w-100 rounded-5 font-size-4 text-center py-9"
              disabled={loading}
            >
              {loading ? <Loader loading /> : "Continue"}
            </button>

            <p className="font-size-4 heading-default-color pt-7">
              Didn&apos;t get the message?{" "}
              <a onClick={handleSendCodeAgain} className="h6 text-primary">
                Send Code again
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BBWOtpInput;

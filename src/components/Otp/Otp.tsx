//PACKAGES
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
//ICONS
import { FcCheckmark } from "react-icons/fc";
import { ImCross } from "react-icons/im";
//COMPONENTS
import { Loader } from "../Common";
//SERVICES
import { userLogin } from "@services/api-services/login";

//INTERFACES
interface OtpProps {
  email: string;
}

const Otp: FC<OtpProps> = ({ email }) => {
  //STATES
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("no error");
  const [loading, setLoading] = useState(false);
  const [isDev, setIsDevelopment] = useState(false);
  //ROUTER
  const router = useRouter();
  //OTHERS
  const hasErrors = errors !== "no error";
  const isValidOTP = errors === "correct otp";
  //USE_EFFECTS
  useEffect(() => {
    const flag = !window.location.hostname.startsWith("blackbusinesswarehouse");
    setIsDevelopment(flag);
  }, []);
  //EVENT_HANDLERS
  const handleChange = (otp) => setOtp(otp);
  const handleSubmit = async (e) => {
    try {
      setErrors("no error");
      e.preventDefault();
      setLoading(true);

      const status = await userLogin({ email, otp, isDev });

      setErrors("correct otp");
      if (status === "PENDING") {
        router.push("/edit-profile");
      } else {
        router.push("/businesses");
      }
    } catch (error) {
      setErrors("Incorrect code. Please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSendCodeAgain = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/send-otp-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });
    setLoading(false);
  };

  return (
    <div className="col-l-6 col-md-6 col-sm-12 pt-11 px-md-7 px-0 pb-6 d-flex flex-column bg-white overflow-hidden">
      <div className="px-20 pt-20 h-100">
        <h5 className="font-size-9 pt-10 line-height-reset ">We emailed you a code</h5>
        <p className="font-size-6 heading-default-color pt-6">
          Enter in the verification code sent to: <span className="font-weight-semibold font-size-6 text-primary"> {email}</span>
        </p>

        <div className="text-black-2 font-weight-semibold mt-12 font-size-5 text-primary ">Enter the verification code:</div>
        <div className="my-4 d-flex">
          {/* @ts-ignore */}
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={6}
            inputStyle={{
              height: "4rem",
              marginRight: "2rem",
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
            {hasErrors ? isValidOTP ? <FcCheckmark size={20} /> : <ImCross color={"red"} size={20} /> : ""}
          </div>
        </div>
        <span className="text-danger mt-1">{hasErrors ? (isValidOTP ? "" : errors) : ""}</span>
        <div className="form-group mt-10 ">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary btn-medium  rounded-5 font-size-4 text-center py-9"
            disabled={loading}
          >
            {/* @ts-ignore */}
            {loading ? <Loader loading /> : "Continue"}
          </button>
        </div>
      </div>
      <p className="font-size-4 heading-default-color pt-7 mb-15 px-20">
        Didn&apos;t get the message?{" "}
        <a onClick={handleSendCodeAgain} className="h6 text-primary">
          Send Code again
        </a>
      </p>
    </div>
  );
};

export default Otp;

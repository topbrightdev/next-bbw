//PACKAGES
import { useContext, useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
//COMPONENTS
import SignIn from "@components/SignIn";
import Otp from "@components/Otp";
//CONTEXT
import GlobalContext from "@context/GlobalContext";
import DataContext from "@context/DataContext";
//IMAGES
import loginImage from "@image/login-cover.png";
//SERVICES
import { getUserWithDetailsById } from "@services/User";
import { getBusinessWithDetailsById } from "@services/Business";

//INTERFACES
interface QueryProps {
  user_id: string;
  business_id: string;
}
interface LoginProps {
  query: QueryProps;
}

const Login: NextPage<LoginProps> = ({ query }) => {
  //STATE
  const [OTPSent, setOTPSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isInvited, setIsInvited] = useState(false);
  const [businessData, setBusinessData] = useState(null);
  const [userData, setUserData] = useState(null);
  //ROUTER
  const router = useRouter();
  //CONTEXT
  const { toggleScheduleCall } = useContext(GlobalContext);
  const { currentUserWithDetails, loading } = useContext(DataContext);
  //USE EFFECT
  useEffect(() => {
    if (currentUserWithDetails && !loading) {
      router.push("/businesses");
    }
  }, [loading, currentUserWithDetails]);
  useEffect(() => {
    if (query.user_id && query.business_id) {
      fetchData();
      setIsInvited(true);
    }
  }, [query]);
  //EVENT_HANDLERS
  const handleRequestDemo = () => {
    toggleScheduleCall();
  };
  const fetchData = async () => {
    const [user, business] = await Promise.all([getUserWithDetailsById(query.user_id), getBusinessWithDetailsById(query.business_id)]);
    setUserData(user);
    setBusinessData(business);
  };
  const handleSubmitEmail = (email) => {
    setEmail(email);
    setOTPSent(true);
  };

  return (
    <>
      <div className="row no-gutters">
        {OTPSent ? (
          <Otp email={email} />
        ) : (
          <SignIn
            isInvited={isInvited}
            onSubmitEmail={handleSubmitEmail}
            handleRequestDemo={handleRequestDemo}
            businessData={businessData}
            userData={userData}
          />
        )}
        <div className={`col-xs-12 w-100 ${isInvited && !OTPSent ? "col-md-7" : "col-md-6 "}`} style={{ height: "100vh" }}>
          {/* @ts-ignore */}
          <img src={loginImage} style={{ objectFit: "cover", height: "100%", width: "100%" }} alt="login" />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  };
}
export default Login;

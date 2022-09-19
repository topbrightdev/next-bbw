import axios from "axios";
import { auth } from "config/firebase";
import { otpBypassAccounts } from "@utils/constants";

interface loginProps {
  email: string;
  otp: string;
  isDev: boolean;
}

const loginWithoutOtp = async ({ email, otp }: Partial<loginProps>) => {
  return axios.post("/api/login-without-otp", { email, otp });
};

const loginWithOtp = async ({ email, otp }: Partial<loginProps>) => {
  return axios.post("/api/login-with-otp", { email, otp });
};

export const userLogin = async ({ email, otp, isDev }: loginProps) => {
  let response;
  if (!isDev || !otpBypassAccounts.includes(email.toLowerCase())) {
    response = await loginWithOtp({ email, otp });
  } else {
    response = await loginWithoutOtp({ email, otp });
  }

  const { token, status } = response.data;
  await auth.signInWithCustomToken(token);
  return status;
};

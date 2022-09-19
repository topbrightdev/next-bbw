import bcrypt from "bcrypt";
import { otpExpiry } from "./constants";

export const validateOtp = async ({ otp, hash, timestamp }) => {
  const result = await bcrypt.compare(otp, hash);
  if (!result) return false;
  const expired = Date.now() - timestamp > otpExpiry;
  if (expired) return false;
  return true;
};

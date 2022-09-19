import { NextApiResponse, NextApiRequest } from "next";
import firebaseAdmin from "config/firebaseAdmin";
import { otpBypassAccounts } from "@utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(404).send({ error: "NOT FOUND" });
  const { email, otp } = req.body;
  if (otp !== "321321") return res.status(404).send({ error: "Invalid OTP" });
  if (!email || !otpBypassAccounts.includes(email.toLowerCase())) return res.status(404).send({ error: "NOT FOUND" });

  const authUser = await firebaseAdmin.auth.getUserByEmail(email);
  if (!authUser) return res.status(404).send({ error: "NOT FOUND" });
  const token = await firebaseAdmin.auth.createCustomToken(authUser.uid);
  return res.status(200).json({ token, status: "ACTIVE" });
};

export default handler;

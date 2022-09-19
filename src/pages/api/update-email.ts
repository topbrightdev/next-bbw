import { NextApiResponse, NextApiRequest } from "next";
import admin from "firebase-admin";
import { validateOtp } from "../../utils/auth";
if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
const auth = admin.auth();
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).json({
      error: {
        code: "not_found",
        message: "The requested endpoint was not found or doesn't support this method.",
      },
    });
  }
  try {
    const { email, otp, newEmail } = req.body;
    if (![email, otp, newEmail].every((item) => !!item)) return res.status(400).json({ message: "Invalid request parameters" });
    const user = await auth.getUserByEmail(email);
    const { hash, timestamp } = (await db.collection("login_otps").doc(user.uid).get()).data();
    const isOtpValid = await validateOtp({ otp, hash, timestamp });
    if (!isOtpValid) return res.status(400).json({ message: "Invalid OTP" });
    await auth.updateUser(user.uid, { email: newEmail });
    const {
      email: [emailId],
    } = await (await db.collection("users").doc(user.uid).get()).data();
    await db.collection("email").doc(emailId).update({ email: newEmail });
    const token = await auth.createCustomToken(user.uid);
    return res.status(200).json({ token });
  } catch (error) {
    if (error.code === "auth/user-not-found") res.status(400).json({ message: "User not found" });
    else return res.status(500).json(error);
  }
};

export default handler;

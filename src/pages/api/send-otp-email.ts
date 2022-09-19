import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { sendEmail } from "../../utils/sendEmail";

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
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const generateRandomOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
  if (req.method === "POST") {
    if (!req.body.email) return res.status(400).json({ message: "Invalid email address" });
    try {
      const user = await auth.getUserByEmail(req.body.email);
      const otp = generateRandomOtp();

      const hash = await bcrypt.hash(otp, saltRounds);
      await db.collection("login_otps").doc(user.uid).set({ hash, timestamp: Date.now() });

      await sendEmail({
        // sender: "dusseau.monquize@gmail.com",
        receiver: user.email,
        subject: "Black Business Warehouse - Login OTP",
        templateId: "d-7d410c5e88e349f38aeafbbadb856188",
        dynamicTemplateData: { login_otp: otp },
        message: `Please enter this OTP to login into the platform: ${otp}`,
      });
      return res.status(200).json({ message: "OTP sent via email" });
    } catch (error) {
      let message: string;
      if (error.code === "auth/user-not-found") message = "User not found";
      else if (error.code === "auth/invalid-email") message = "Invalid email address";
      if (message) res.status(400).json({ message });
      else return res.status(500).send(JSON.stringify(error));
    }
  } else {
    return res.status(404).json({
      error: {
        code: "not_found",
        message: "The requested endpoint was not found or doesn't support this method.",
      },
    });
  }
};
export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import asyncWrapper from "../_middleware";
import { sendInviteEmail } from "../../../utils/sendEmail";

const handler = asyncWrapper(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") throw "NOT_FOUND";
  const { targetEmail, senderEmail, senderRole, companyName, companyId, senderId } = req.body;
  await sendInviteEmail({
    targetEmail,
    senderEmail,
    senderRole,
    companyName,
    senderId,
    companyId,
  });
  return res.status(200).send({ message: "Invitation sent" });
});

export default handler;

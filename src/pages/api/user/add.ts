import { NextApiRequest, NextApiResponse } from "next";
import asyncWrapper from "../_middleware";
import { sendInviteEmail } from "../../../utils/sendEmail";
// import {
//   authService,
//   businessService,
//   emailService,
//   userService,
// } from "../../../services";

import authService from "@services/Auth";
import * as businessService from "@services/Business";
import * as emailService from "@services/Email";
import * as userService from "@services/User";
import { UserStatus } from "../../../services/User/types";

const handler = asyncWrapper(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") throw "NOT_FOUND";
  const role = "general";
  const status = UserStatus.PENDING;
  const { targetEmail, senderEmail, senderRole, companyName, companyId, senderId } = req.body;

  const authUser = await authService.createUser({ email: targetEmail });
  const { uid } = authUser;
  const dbEmailId = await emailService.addEmail({
    email: targetEmail,
    parentId: uid,
    parentType: "USER",
  });

  await userService.addUser({
    id: uid,
    role,
    status,
    email: [dbEmailId],
    parentId: companyId,
  });

  await businessService.addUserToBusiness(companyId, uid);

  const inviteData = { targetEmail, senderEmail, companyName, senderRole, senderId, companyId };
  await sendInviteEmail(inviteData);
  return res.status(200).send({
    message: "Invitation sent",
    user: { id: uid, email: [targetEmail], status, role },
  });
});
export default handler;

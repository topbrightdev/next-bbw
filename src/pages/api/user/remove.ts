import { NextApiRequest, NextApiResponse } from "next";
import asyncWrapper from "../_middleware";
import { authService, businessService, emailService, phoneService, userService } from "../../../services/";
import { DefaultValues } from "@utils/constants";

const handler = asyncWrapper(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") throw "NOT_FOUND";
  const { ownerId, userId, companyId } = req.body;
  const ownerData = await userService.getUserById(ownerId);
  if (!ownerData.role || ownerData.role.toLowerCase() !== DefaultValues.ADMIN) throw "UNAUTHORIZED";
  // REMOVE USER FROM BUSINESS's USER ARRAY
  await businessService.removeUserFromBusiness(companyId, userId);

  // GET USER DATA FOR EMAIL AND PHONE
  const userData = await userService.getUserById(userId);
  const { email, phone } = userData;
  if (Array.isArray(email)) {
    await Promise.all(email.map((emailId: string) => emailService.deleteEmail(emailId)));
  }
  if (Array.isArray(phone)) {
    await Promise.all(phone.map((phoneId: string) => phoneService.deletePhone(phoneId)));
  }

  await Promise.all([userService.deleteUser(userId), authService.deleteUser({ uid: userId })]);

  return res.status(200).send({ message: "User Deleted" });
});

export default handler;

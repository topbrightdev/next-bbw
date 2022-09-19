import { CreateUserType, DeleteUserType } from "./auth-types";
import firebaseAdmin from "../../config/firebaseAdmin";
const crypto = require("crypto");
const { auth } = firebaseAdmin;

const createUser = async (params: CreateUserType) => {
  const { email } = params;
  const randomPassword = crypto.randomBytes(8).toString("hex");
  const authUser = await auth.createUser({ email, password: randomPassword });
  return authUser;
};

const deleteUser = async (params: DeleteUserType) => {
  const { uid } = params;
  return await auth.deleteUser(uid);
};

const authService = {
  createUser,
  deleteUser,
};

export default authService;

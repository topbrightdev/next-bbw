import axios from "axios";

const api = axios.create({
  baseURL: "/api/user",
  headers: { "Content-Type": "application/json" },
});

interface AddUserProps {
  targetEmail: string;
  senderEmail: string;
  senderRole: string;
  companyName: string;
  companyId: string;
  senderId: string;
}

interface DeleteUserProps {
  userId: string;
  ownerId: string;
  companyId: string;
}

export const addUser = async ({ targetEmail, senderEmail, senderRole, companyName, companyId, senderId }: AddUserProps) => {
  const { data: newUser } = await api.post("/add", { targetEmail, senderEmail, senderRole, companyName, companyId, senderId });
  return newUser;
};

export const resendInvite = async ({ targetEmail, senderEmail, senderRole, companyName, companyId, senderId }: AddUserProps) => {
  return api.post("/resend", { targetEmail, senderEmail, senderRole, companyName, companyId, senderId });
};

export const deleteUser = async ({ userId, ownerId, companyId }: DeleteUserProps) => {
  return api.post("/remove", { userId, ownerId, companyId });
};

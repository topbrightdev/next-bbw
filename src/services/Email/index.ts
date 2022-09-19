import { collectionNames } from "../../utils/constants";
import { EmailInterface, AddEmailInterface } from "./types";
import { getUserById, updateUser } from "../User";
import { db } from "../../config/firebase";
import { getBusinessById, updateBusiness } from "../Business";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as EmailInterface,
  toFirestore: (data: Partial<EmailInterface>) => data,
};

const EMAIL_COLLECTION = db.collection(collectionNames.EMAILS_COLLECTION).withConverter(converter);

const updateEmail = async (id: string, email: string) => {
  await EMAIL_COLLECTION.doc(id).update({ email });
  return Promise.resolve();
};

const addEmail = async (email: AddEmailInterface) => {
  const newEmail = await EMAIL_COLLECTION.doc();
  await newEmail.set(email as EmailInterface);
  return newEmail.id;
};

const getEmailById = async (id: string) => {
  const doc = await EMAIL_COLLECTION.doc(id).get();
  return { ...doc.data(), id };
};

const addEmailInUser = async (email: Required<AddEmailInterface>) => {
  const emailId = await addEmail(email as EmailInterface);
  const user = await getUserById(email.parentId);
  let { email: userEmail } = user || {};
  !userEmail ? (userEmail = []) : null;
  userEmail.push(emailId);
  await updateUser(email.parentId, { ...user, email: userEmail });
  return emailId;
};
const addEmailInBusiness = async (email: Required<AddEmailInterface>) => {
  const emailId = await addEmail(email as EmailInterface);
  const business = await getBusinessById(email.parentId);
  let { email: userEmail } = business || {};
  !userEmail ? (userEmail = []) : null;
  userEmail.push(emailId);
  await updateBusiness(email.parentId, { ...business, email: userEmail });
  return emailId;
};

const deleteEmail = async (email) => {
  return await EMAIL_COLLECTION.doc(email).delete();
};

export { addEmail, addEmailInUser, getEmailById, updateEmail, addEmailInBusiness, deleteEmail };

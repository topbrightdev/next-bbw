import { collectionNames } from "../../utils/constants";
import { AddUserInterface, UserInterface } from "./types";
import { getBusinessById, updateBusiness } from "../Business";
import { db } from "../../config/firebase";
import { getEmailById } from "../Email";
import { getPhoneById } from "../Phone";
import { getMediaById } from "@services/Media";
const converter = {
  fromFirestore: (snapshot) => snapshot.data() as UserInterface,
  toFirestore: (data: Partial<UserInterface>) => data,
};
const USERS_COLLECTION = db.collection(collectionNames.USERS_COLLECTION).withConverter(converter);

export const addUser = async (user: AddUserInterface) => {
  const newUser = await USERS_COLLECTION.doc(user.id);
  await newUser.set(user as UserInterface);
  return user.id;
};

export const updateUserProfileAvatar = async (userId: string, mediaId: string) => {
  await USERS_COLLECTION.doc(userId).update({ mediaId });
};

export const getUserById = async (id: string) => {
  const doc = await USERS_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

export const updateUser = async (id: string, update: Partial<UserInterface>) => {
  await USERS_COLLECTION.doc(id).update(update);
};

export const getAllUsers = async (users: string[]) => {
  const usersArray = users.map(async (user) => await getUserById(user));
  const usersData = await Promise.all(usersArray);
  // @ts-ignore
  const result = await setEmailAndPhoneValuesInUsers(usersData);

  return result;
};

export const setEmailAndPhoneValuesInUsers = async (users: UserInterface[]) => {
  for (let user = 0; user < users.length; user++) {
    const emailArray = [];
    const phoneArray = [];
    const { email, phone } = users[user];

    for (let emailObject of email) {
      const emailData = await getEmailById(emailObject);
      emailArray.push(emailData.email);
      users[user].email = emailArray;
    }
    if (phone && Array.isArray(phone)) {
      for (let phoneObject of phone) {
        const phoneData = await getPhoneById(phoneObject);
        phoneArray.push(phoneData.phone);
        users[user].phone = phoneArray;
      }
    }
  }
  return users;
};

export const addUserInBusiness = async (businessId: string, user: Partial<AddUserInterface>) => {
  const userId = await addUser(user as UserInterface);
  const business = await getBusinessById(businessId);
  const { user: businessUsers } = business;
  businessUsers.push(userId);
  await updateBusiness(businessId, { ...business, user: businessUsers });
  return userId;
};

export const deleteUser = async (userId) => {
  return await USERS_COLLECTION.doc(userId).delete();
};

export const getUserFields = async ({ ...user }: UserInterface) => {
  const { phone, email, mediaId, parentId } = user;
  const [mediaData, phoneData, emailData, businessData] = await Promise.all([
    mediaId ? getMediaById(mediaId) : null,
    Array.isArray(phone) ? Promise.all(phone?.map((id) => getPhoneById(id))) : Promise.resolve([]),
    Array.isArray(email) ? Promise.all(email?.map((id) => getEmailById(id))) : Promise.resolve([]),
    parentId ? getBusinessById(parentId) : Promise.resolve({}),
  ]);
  const output = {
    mediaId: mediaData ? { id: mediaData.id, source: mediaData.source } : {},
    phone: Array.isArray(phone) ? phoneData.map((d) => ({ id: d.id, phone: d.phone })) : [],
    email: Array.isArray(email) ? emailData.map((d) => ({ id: d.id, email: d.email })) : [],
    business: businessData ? businessData : {},
  };
  return output;
};

export const getUserWithDetailsById = async (id: string) => {
  const user: UserInterface = await getUserById(id);
  const userDetails = await getUserFields(user);
  return {
    ...user,
    ...userDetails,
  };
};

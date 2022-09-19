import { collectionNames } from "../../utils/constants";

import { PhoneInterface, AddPhoneInterface } from "./types";
import { getUserById, updateUser } from "../User";
import { getBusinessById, updateBusiness } from "../Business";
import { db } from "../../config/firebase";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as PhoneInterface,
  toFirestore: (data: Partial<PhoneInterface>) => data,
};

const PHONE_COLLECTION = db.collection(collectionNames.PHONE_COLLECTION).withConverter(converter);

const addPhone = async (phone: AddPhoneInterface) => {
  const newPhone = await PHONE_COLLECTION.doc();
  await newPhone.set(phone as PhoneInterface);
  return newPhone.id;
};

const updatePhoneNumber = async (id: string, phone: string) => {
  await PHONE_COLLECTION.doc(id).update({ phone });
  return Promise.resolve();
};

const getPhoneById = async (id: string) => {
  const doc = await PHONE_COLLECTION.doc(id).get();
  return { ...doc.data(), id };
};

const addPhoneInUser = async (phone: Required<AddPhoneInterface>) => {
  const phoneId = await addPhone(phone);
  const user = await getUserById(phone.parentId);
  let { phone: userPhone } = user || {};
  !userPhone ? (userPhone = []) : null;
  userPhone.push(phoneId);
  await updateUser(phone.parentId, { ...user, phone: userPhone });
  return phoneId;
};

const addPhoneInBusiness = async (phone: Required<AddPhoneInterface>) => {
  const phoneId = await addPhone(phone);
  const business = await getBusinessById(phone.parentId);
  let { phone: businessPhone } = business || {};
  !businessPhone ? (businessPhone = []) : null;
  businessPhone.push(phoneId);
  await updateBusiness(phone.parentId, {
    ...business,
    phone: businessPhone,
  });
  return phoneId;
};

const deletePhone = async (phone) => {
  return await PHONE_COLLECTION.doc(phone).delete();
};

export { addPhone, addPhoneInUser, addPhoneInBusiness, getPhoneById, updatePhoneNumber, deletePhone };

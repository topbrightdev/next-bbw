import { collectionNames } from "../../utils/constants";
import admin from "firebase-admin";

import { AddressInterface, AddAddressInterface } from "./types";
import { getBusinessById, updateBusiness } from "../Business";

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as AddressInterface,
  toFirestore: (data: Partial<AddressInterface>) => data,
};

const ADDRESSCOLLECTION = admin.firestore().collection(collectionNames.ADDRESS_COLLECTION).withConverter(converter);

const addAddress = async (address: AddAddressInterface) => {
  const newAddress = await ADDRESSCOLLECTION.doc();
  await newAddress.set(address as AddressInterface);
  return newAddress.id;
};

const addAddressInBusiness = async (address: Partial<AddAddressInterface>) => {
  const addressId = await addAddress(address as AddressInterface);
  const business = await getBusinessById(address.parentId);
  const { address: businessAddress } = business;
  businessAddress.push(addressId);
  await updateBusiness(address.parentId, {
    ...business,
    address: businessAddress,
  });
  return addressId;
};

export { addAddress, addAddressInBusiness };

import { collectionNames } from "../../utils/constants";
import admin from "firebase-admin";

import { NaicsInterface, AddNaicsInterface } from "./types";

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
  fromFirestore: (snapshot) => snapshot.data() as NaicsInterface,
  toFirestore: (data: Partial<NaicsInterface>) => data,
};

const NAICS_COLLECTION = admin.firestore().collection(collectionNames.NAICS_COLLECTION).withConverter(converter);

const addNaics = async (naics: AddNaicsInterface) => {
  const newNaics = await NAICS_COLLECTION.doc();
  await newNaics.set(naics as NaicsInterface);
  return newNaics.id;
};

export { addNaics };

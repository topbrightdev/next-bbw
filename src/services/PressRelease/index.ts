import { collectionNames } from "../../utils/constants";
import { db } from "config/firebase";

import { PressReleaseInterface, AddPressReleaseInterface } from "./types";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as PressReleaseInterface,
  toFirestore: (data: Partial<PressReleaseInterface>) => data,
};

const PRESS_RELEASE_COLLECTION = db.collection(collectionNames.PRESS_RELEASE_COLLECTION).withConverter(converter);

const addPressRelease = async ({ ...pressRelease }: AddPressReleaseInterface) => {
  const hasPressRelease = await isExist(pressRelease);
  // @ts-ignore
  if (!hasPressRelease.length && pressRelease.source) {
    const newPressRelease = await PRESS_RELEASE_COLLECTION.doc();
    await newPressRelease.set(pressRelease as PressReleaseInterface);
    return newPressRelease.id;
  }
};
const getPressReleaseById = async (id: string) => {
  const doc = await PRESS_RELEASE_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};
const updatePressRelease = async (id: string, update: Partial<AddPressReleaseInterface>) => {
  await PRESS_RELEASE_COLLECTION.doc(id).update(update);
};
const deletePressRelease = async (id: string) => {
  await PRESS_RELEASE_COLLECTION.doc(id).delete();
};
const isExist = async (pressRelease: AddPressReleaseInterface) => {
  const doc = await PRESS_RELEASE_COLLECTION.where("businessId", "==", pressRelease.businessId)
    .where("source", "==", pressRelease.source)
    .get()
    .then((res) => {
      let data = res.docs.map((entry) => {
        let object = {};
        object = entry.data();
        return { ...object, id: entry.id };
      });
      return data;
    })
    .catch((err) => console.error("ERROR!!", err));
  return doc;
};

const getPressReleaseByBusinessId = async (id: string) => {
  const doc = await PRESS_RELEASE_COLLECTION.where("businessId", "==", id)
    .get()
    .then((res) => {
      let data = res.docs.map((entry) => {
        let object = {};
        object = entry.data();
        return { ...object, id: entry.id };
      });
      return data;
    })
    .catch((err) => console.error("ERROR!!", err));
  return doc;
};

export { addPressRelease, updatePressRelease, getPressReleaseByBusinessId, isExist, deletePressRelease, getPressReleaseById };

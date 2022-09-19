import { collectionNames } from "../../utils/constants";
import { db } from "../../config/firebase";

import { CertificationInterface, AddCertificationInterface } from "./types";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as CertificationInterface,
  toFirestore: (data: Partial<CertificationInterface>) => data,
};

const CERTIFICATION_COLLECTION = db.collection(collectionNames.CERTIFICATION_COLLECTION).withConverter(converter);

const addCertification = async (certification: AddCertificationInterface) => {
  const newCertification = await CERTIFICATION_COLLECTION.doc();
  await newCertification.set(certification as CertificationInterface);
  return newCertification.id;
};
const getCertificationById = async (id: string) => {
  const doc = await CERTIFICATION_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};
const getCertificationByBusinessId = async (id: string) => {
  const certification = await CERTIFICATION_COLLECTION.where("businessId", "==", id)
    .get()
    .then((res) => {
      let data = res.docs.map((entry) => entry.data());
      return data;
    })
    .catch((err) => console.error("ERROR!!", err));

  return certification;
};

const getAllCertifications = async () => {
  const docs = await CERTIFICATION_COLLECTION.get()
    .then((res) => {
      let data = res.docs.map((entry) => {
        let object = {};
        object = entry.data();
        return { ...object, id: entry.id };
      });
      return data;
    })
    .catch((err) => console.error("ERROR!!", err));
  return docs;
};

export { addCertification, getCertificationByBusinessId, getCertificationById, getAllCertifications };

import { collectionNames } from "../../utils/constants";
import { SubcategoryInterface, AddSubcategoryInterface } from "./types";
import { db } from "../../config/firebase";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as SubcategoryInterface,
  toFirestore: (data: Partial<SubcategoryInterface>) => data,
};

const SUB_CATEGORY_COLLECTION = db.collection(collectionNames.SUB_CATEGORY_COLLECTION).withConverter(converter);

export const getSubcategoryById = async (id: string) => {
  const doc = await SUB_CATEGORY_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

export const addSubIndustry = async (subIndustry: AddSubcategoryInterface) => {
  const newSubIndustry = SUB_CATEGORY_COLLECTION.doc();
  await newSubIndustry.set(subIndustry as SubcategoryInterface);
  return newSubIndustry.id;
};

export const getAllSubcategories = async () => {
  return (await SUB_CATEGORY_COLLECTION.get()).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

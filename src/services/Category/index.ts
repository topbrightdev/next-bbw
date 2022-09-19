import { collectionNames } from "../../utils/constants";
import { CategoryInterface, AddCategoryInterface } from "./types";
import { db } from "../../config/firebase";
import { getSubcategoryById } from "@services/Subcategory";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as CategoryInterface,
  toFirestore: (data: Partial<CategoryInterface>) => data,
};

const CATEGORY_COLLECTION = db.collection(collectionNames.CATEGORY_COLLECTION).withConverter(converter);

export const getCategoryById = async (id: string) => {
  const doc = await CATEGORY_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

export const getCategories = async () => {
  const industries = await CATEGORY_COLLECTION.get();
  return industries.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

export const getSubcategoriesByCategoryId = async (id: string) => {
  const { subcategory } = await getCategoryById(id);
  const array = await Promise.all(subcategory.map((id) => getSubcategoryById(id)));
  return array;
};

export const addCategory = async (category: AddCategoryInterface) => {
  const newCategory = CATEGORY_COLLECTION.doc();
  await newCategory.set(category as CategoryInterface);
  return newCategory.id;
};

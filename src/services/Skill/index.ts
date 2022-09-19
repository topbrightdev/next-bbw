import { collectionNames } from "../../utils/constants";
import { db } from "config/firebase";
import { SkillsInterface, AddSkillsInterface } from "./types";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as SkillsInterface,
  toFirestore: (data: Partial<SkillsInterface>) => data,
};

const SKILLS_COLLECTION = db.collection(collectionNames.SKILLS_COLLECTION).withConverter(converter);

const addSkills = async (skills: AddSkillsInterface) => {
  const newSkills = await SKILLS_COLLECTION.doc();
  await newSkills.set(skills as SkillsInterface);
  return newSkills.id;
};

const getSkills = async () => {
  const candidates = await SKILLS_COLLECTION.get();
  return candidates.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

const getSkillsById = async (id: string) => {
  const doc = await SKILLS_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

export { addSkills, getSkillsById, getSkills };

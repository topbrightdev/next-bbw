import { collectionNames } from "../../utils/constants";
import { CandidateRolesInterface, AddCandidateRolesInterface } from "./types";
import { db } from "../../config/firebase";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as CandidateRolesInterface,
  toFirestore: (data: Partial<CandidateRolesInterface>) => data,
};

const CANDIDATES_ROLES_COLLECTION = db.collection(collectionNames.CANDIDATES_ROLES_COLLECTION).withConverter(converter);

const getCandidateRoleById = async (id: string) => {
  const doc = await CANDIDATES_ROLES_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

const addCandidateRole = async (candidate: AddCandidateRolesInterface) => {
  const newCandidateRole = CANDIDATES_ROLES_COLLECTION.doc();
  await newCandidateRole.set(candidate as CandidateRolesInterface);
  return newCandidateRole.id;
};

export { addCandidateRole, getCandidateRoleById };

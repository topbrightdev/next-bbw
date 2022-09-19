import { collectionNames } from "../../utils/constants";
import { db } from "../../config/firebase";
import { SolicitationRequirementsInterface, AddSolicitationRequirementsInterface } from "./types";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as SolicitationRequirementsInterface,
  toFirestore: (data: Partial<SolicitationRequirementsInterface>) => data,
};

const SOLICITATION_REQUIREMENTS_COLLECTION = db
  .collection(collectionNames.SOLICITATION_REQUIREMENTS_COLLECTION)
  .withConverter(converter);

const addSolicitationRequirement = async (solicitationRequirement: AddSolicitationRequirementsInterface) => {
  const newSolicitaitonRequirement = await SOLICITATION_REQUIREMENTS_COLLECTION.doc();
  await newSolicitaitonRequirement.set(solicitationRequirement as SolicitationRequirementsInterface);
  return newSolicitaitonRequirement.id;
};

const updateSolicitationRequirement = async (id: string, update: Partial<AddSolicitationRequirementsInterface>) => {
  await SOLICITATION_REQUIREMENTS_COLLECTION.doc(id).update(update);
};

const getSolicitationRequirementByBusinessId = async (id: string) => {
  try {
    const doc = (await SOLICITATION_REQUIREMENTS_COLLECTION.where("businessId", "==", id).get()).docs.map((entry) => ({
      ...entry.data(),
      id: entry.id,
    }));

    return doc[0];
  } catch (error) {
    console.error("ERROR ", error);
  }
};

export { addSolicitationRequirement, getSolicitationRequirementByBusinessId, updateSolicitationRequirement };

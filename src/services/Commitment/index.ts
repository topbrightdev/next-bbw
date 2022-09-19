import { collectionNames } from "../../utils/constants";
import { CommitmentInterface, AddCommitmentInterface } from "./types";
import { db } from "../../config/firebase";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as CommitmentInterface,
  toFirestore: (data: Partial<CommitmentInterface>) => data,
};

const COMMITMENT_COLLECTION = db.collection(collectionNames.COMMITMENT_COLLECTION).withConverter(converter);

const addCommitment = async (commitment: AddCommitmentInterface) => {
  const newCommitment = await COMMITMENT_COLLECTION.doc();
  await newCommitment.set(commitment as CommitmentInterface);
  return newCommitment.id;
};

const getCommitmentByBusinessId = async (id: string) => {
  try {
    const doc = (await COMMITMENT_COLLECTION.where("businessId", "==", id).get()).docs.map((entry) => ({
      ...entry.data(),
      id: entry.id,
    }));

    return doc[0];
  } catch (error) {
    console.error("ERROR ", error);
  }
};

const updateCommitment = async (id: string, update: Partial<AddCommitmentInterface>) => {
  await COMMITMENT_COLLECTION.doc(id).update(update);
};

export { addCommitment, getCommitmentByBusinessId, updateCommitment };

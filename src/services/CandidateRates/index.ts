import { collectionNames } from "../../utils/constants";
import { CandidateRatesInterface, AddCandidateRatesInterface } from "./types";
import { db } from "../../config/firebase";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as CandidateRatesInterface,
  toFirestore: (data: Partial<CandidateRatesInterface>) => data,
};

const CANDIDATES_RATES_COLLECTION = db.collection(collectionNames.CANDIDATES_RATES_COLLECTION).withConverter(converter);

const getCandidateRateById = async (id: string) => {
  const doc = await CANDIDATES_RATES_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

const addCandidateRate = async (candidate: AddCandidateRatesInterface) => {
  const newCandidateRate = CANDIDATES_RATES_COLLECTION.doc();
  await newCandidateRate.set(candidate as CandidateRatesInterface);
  return newCandidateRate.id;
};

export { addCandidateRate, getCandidateRateById };

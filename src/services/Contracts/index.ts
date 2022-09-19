import { collectionNames } from "../../utils/constants";
import { db } from "../../config/firebase";

import { ContractsInterface, AddContractsInterface } from "./types";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as ContractsInterface,
  toFirestore: (data: Partial<ContractsInterface>) => data,
};

const CONTRACTS_COLLECTION = db.collection(collectionNames.CONTRACTS_COLLECTION).withConverter(converter);

const addContracts = async (contracts: AddContractsInterface) => {
  const newContracts = await CONTRACTS_COLLECTION.doc();
  await newContracts.set(contracts as ContractsInterface);
  return newContracts.id;
};
const updateContract = async (id: string, update: Partial<AddContractsInterface>) => {
  await CONTRACTS_COLLECTION.doc(id).update(update);
};

const getContractById = async (id: string) => {
  const doc = await CONTRACTS_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

const deleteContract = async (id: string) => {
  await CONTRACTS_COLLECTION.doc(id).delete();
};

const getContractsByBusinessId = async (businessId: string) => {
  try {
    const docs = (await CONTRACTS_COLLECTION.where("businessId", "==", businessId).get()).docs.map((entry) => ({
      ...entry.data(),
      id: entry.id,
    }));

    return docs;
  } catch (error) {
    console.error("ERROR", error);
  }
};

const getConnectingOpportunities = async (id: string) => {
  try {
    const docs = (await CONTRACTS_COLLECTION.where("businessId", "==", id).get()).docs.map((entry) => ({
      ...entry.data(),
      id: entry.id,
    }));

    return docs;
  } catch (error) {
    console.error("ERROR", error);
  }
};

const getConnectingPrograms = async (id: string) => {
  try {
    const docs = (await CONTRACTS_COLLECTION.where("businessId", "==", id).where("type", "==", `Program`).get()).docs.map((entry) => ({
      ...entry.data(),
      id: entry.id,
    }));
    return docs;
  } catch (error) {
    console.error("error", error);
  }
};
const getConnectingResources = async (id: string) => {
  try {
    const docs = (await CONTRACTS_COLLECTION.where("businessId", "==", id).where("type", "==", `Resource`).get()).docs.map((entry) => ({
      ...entry.data(),
      id: entry.id,
    }));
    return docs;
  } catch (error) {
    console.error("error", error);
  }
};

export {
  addContracts,
  getConnectingOpportunities,
  getConnectingPrograms,
  getConnectingResources,
  getContractsByBusinessId,
  getContractById,
  updateContract,
  deleteContract,
};

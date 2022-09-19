import { collectionNames } from "../../utils/constants";
import { MediaInterface, AddMediaInterface } from "./types";
import { db } from "../../config/firebase";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as MediaInterface,
  toFirestore: (data: Partial<MediaInterface>) => data,
};

const MEDIA_COLLECTION = db.collection(collectionNames.MEDIA_COLLECTION).withConverter(converter);

const getAllMedia = async () => {
  return (await MEDIA_COLLECTION.get()).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const addMedia = async (source: AddMediaInterface) => {
  const newMedia = await MEDIA_COLLECTION.doc();
  await newMedia.set(source as MediaInterface);
  return newMedia.id;
};

const updateMedia = async (id: string, update: Partial<AddMediaInterface>) => {
  try {
    await MEDIA_COLLECTION.doc(id).update(update);
  } catch (error) {
    console.error("ERROR", error);
  }
};

const getMediaById = async (id: string) => {
  const doc = await MEDIA_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

export { getMediaById, addMedia, updateMedia, getAllMedia };

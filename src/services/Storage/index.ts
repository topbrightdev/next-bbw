import { storage } from "../../config/firebase";
import { DefaultValues, storageFolderNames } from "../../utils/constants";
import { getMediaById } from "@services/Media";

export const getProfileAvatarUrl = async (path: string, type: string) => {
  try {
    if (!path) return "";
    let folderPath: string;
    type === DefaultValues.BUSINESS ? (folderPath = storageFolderNames.LOGOS_FOLDER) : (folderPath = storageFolderNames.AVATAR_FOLDER);
    const imageUrl = await storage.ref(`${folderPath}/${path}`).getDownloadURL();
    return imageUrl;
  } catch (error) {
    console.error("ERROR", error);
  }
};

export const uploadProfileAvatar = async (id: string, base64: string, type: string) => {
  try {
    const response = await fetch(base64);
    const blob = await response.blob();
    const filename = `${id}_${Date.now()}`;
    let folderPath: string;
    type === DefaultValues.BUSINESS ? (folderPath = storageFolderNames.LOGOS_FOLDER) : (folderPath = storageFolderNames.AVATAR_FOLDER);
    await storage.ref(`${folderPath}/${filename}`).put(blob);
    return filename;
  } catch (error) {
    console.error("ERROR", error);
  }
};

export const getResumeUrl = async (path: string) => {
  try {
    if (!path) return "";
    const resumeUrl = await storage.ref(`${storageFolderNames.RESUMES_FOLDER}/${path}`).getDownloadURL();
    return resumeUrl;
  } catch (error) {
    console.error("error");
  }
};

export const getMediaUrl = async (id: string, type: string) => {
  try {
    const { source } = await getMediaById(id);
    const result = await getProfileAvatarUrl(source, type);
    return result;
  } catch (error) {
    console.error("ERROR", error);
  }
};

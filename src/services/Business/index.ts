import { collectionNames } from "../../utils/constants";
import { db } from "../../config/firebase";
import { BusinessInterface, AddBusinessInterface } from "./types";
import firebase from "firebase";
import { getCategoryById } from "../Category";
import { getSubcategoryById } from "../Subcategory";
import { getEmailById } from "../Email";
import { getPhoneById } from "../Phone";
import { getCertificationById } from "../Certification";
import { getMediaById } from "@services/Media";
import { getPressReleaseById } from "@services/PressRelease";
const converter = {
  fromFirestore: (snapshot) => snapshot.data() as BusinessInterface,
  toFirestore: (data: Partial<BusinessInterface>) => data,
};

const BUSINESS_COLLECTION = db.collection(collectionNames.BUSINESS_COLLECTION).withConverter(converter);

export const addBusiness = async ({ ...business }: AddBusinessInterface) => {
  const newBusiness = BUSINESS_COLLECTION.doc();
  await newBusiness.set(business as BusinessInterface);
  return newBusiness.id;
};

export const getBusinessById = async (id: string) => {
  const doc = await BUSINESS_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

export const getBusinesses = async (size: any = { weight: ">=", revenue: 0 }, type: string) => {
  try {
    if (!size || (size.length && size.length > 1)) {
      size = { weight: ">=", revenue: 0 };
    }

    const filter = type === "BUSINESS" ? ["BUSINESS"] : ["PARTNER TRADING", "PARTNER CONNECTING"];

    let businesses = (
      await BUSINESS_COLLECTION.where("revenue", `${size.weight}` as firebase.firestore.WhereFilterOp, size.revenue)
        .where("type", "in", filter)
        .orderBy("revenue", "desc")
        .get()
    ).docs.map((entry) => ({ ...entry.data(), id: entry.id }));

    // @ts-ignore
    const result = await Promise.all(
      businesses.map(async (business) => {
        const otherData = await getBusinessFields(business);
        return { ...business, ...otherData };
      }),
    );
    return result;
  } catch (error) {
    console.error("ERROR", error);
  }
};

export const getBusinessWithFilter = async (filters, size, state, type) => {
  try {
    const typeOperator: firebase.firestore.WhereFilterOp = type === "BUSINESS" ? "==" : "!=";
    let filterCollection = (await BUSINESS_COLLECTION.where("type", typeOperator, "BUSINESS").get()).docs.map((entry) => ({
      ...entry.data(),
      id: entry.id,
    }));
    if (!filterCollection) filterCollection = [];

    if (Array.isArray(filters) && filters.length && filters[0] !== "All") {
      filterCollection = filterCollection.filter((doc) => filters.includes(doc.categoryId));
    }

    filterCollection = filterCollection.filter((doc) => {
      if (size.weight === ">") return doc.revenue ? doc.revenue > size.revenue : true;
      else if (size.weight === "<") return doc.revenue ? doc.revenue < size.revenue : true;
      else if (size.weight === ">=") return doc.revenue ? doc.revenue >= size.revenue : true;
      else if (size.weight === "<=") return doc.revenue ? doc.revenue <= size.revenue : true;
      return true;
    });

    if (state && state !== "ALL") {
      filterCollection = filterCollection.filter((doc) => doc.state === state);
    }

    const result = await Promise.all(
      filterCollection.map(async (business) => {
        const otherData = await getBusinessFields(business);
        return { ...business, ...otherData };
      }),
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getBusinessType = async (id: string) => {
  const business = (await BUSINESS_COLLECTION.doc(id).get()).data();
  return business.type;
};

export const setCertificationNameInBusiness = async ({ ...business }: BusinessInterface) => {
  const certificationArray = [];
  const { certification } = business;
  if (certification && Array.isArray(certification)) {
    for (let certificationObject of certification) {
      const certificationData = await getCertificationById(certificationObject);
      certificationArray.push(certificationData.name);
    }
    business.certification = certificationArray;
  }

  return business;
};

export const setEmailAndPhoneValuesInBusiness = async ({ ...business }: BusinessInterface) => {
  const emailArray = [];
  const phoneArray = [];
  const { email, phone } = business;

  for (let emailObject of email) {
    const emailData = await getEmailById(emailObject);
    emailArray.push(emailData.email);
    business.email = emailArray;
  }
  if (phone && Array.isArray(phone)) {
    for (let phoneObject of phone) {
      const phoneData = await getPhoneById(phoneObject);
      phoneArray.push(phoneData.phone);
      business.phone = phoneArray;
    }
  }

  return business;
};

export const getBusinessFields = async ({ ...business }: BusinessInterface) => {
  const { mediaId, phone, email, categoryId, subcategory, certification, news } = business;
  const [mediaData, phoneData, emailData, categoryData, subcategoryData, certificationData, newsData] = await Promise.all([
    mediaId ? getMediaById(mediaId) : null,
    Array.isArray(phone) ? Promise.all(phone.map((pid) => getPhoneById(pid))) : Promise.resolve([]),
    Array.isArray(email) ? Promise.all(email.map((eid) => getEmailById(eid))) : Promise.resolve([]),
    categoryId ? getCategoryById(categoryId) : null,
    Array.isArray(subcategory) ? Promise.all(subcategory.map((sid) => getSubcategoryById(sid))) : Promise.resolve([]),
    Array.isArray(certification) ? Promise.all(certification.map((cid) => getCertificationById(cid))) : Promise.resolve([]),
    Array.isArray(news) ? Promise.all(news.map((pid) => getPressReleaseById(pid))) : Promise.resolve([]),
  ]);

  const output = {
    mediaId: mediaData ? { id: mediaData.id, source: mediaData.source } : { id: "", source: "" },
    phone: Array.isArray(phone) ? phoneData.map((p) => ({ id: p.id, phone: p.phone })) : [],
    email: Array.isArray(email) ? emailData.map((e) => ({ id: e.id, email: e.email })) : [],
    subcategory: Array.isArray(subcategory) ? subcategoryData.map((s) => ({ id: s.id, name: s.name })) : [],
    categoryId: categoryData ? { id: categoryData.id, name: categoryData.name } : { id: "", name: "" },
    certification: Array.isArray(certificationData) ? certificationData.map((c) => ({ id: c.id, name: c.name })) : [],
    news: Array.isArray(newsData) ? newsData.map((n) => ({ id: n.id, source: n.source })) : [],
  };
  return output;
};

export const updateBusiness = async (id: string, update: Partial<BusinessInterface>) => {
  await BUSINESS_COLLECTION.doc(id).update(update);
};

export const setCategoryNamesInBusinesses = async ({ ...business }: BusinessInterface) => {
  const categoryArray = [];
  const { subcategory, categoryId } = business;

  const industryData = await getCategoryById(categoryId);
  business.categoryId = industryData.name;
  for (let subcategoryId of subcategory) {
    const industryData = await getSubcategoryById(subcategoryId);

    categoryArray.push(industryData.name);
    business.subcategory = categoryArray;
  }

  return business;
};

export const setCategoryNamesInBusiness = async ({ ...business }: BusinessInterface) => {
  const categoryArray = [];
  const { subcategory, categoryId } = business;

  const industryData = await getCategoryById(categoryId);
  business.categoryId = industryData.name;
  for (let subcategoryId of subcategory) {
    const industryData = await getSubcategoryById(subcategoryId);

    categoryArray.push(industryData.name);
    business.subcategory = categoryArray;
  }

  return business;
};

export const addUserToBusiness = async (businessId: string, uid: string) => {
  const businessRef = await BUSINESS_COLLECTION.doc(businessId);
  return await businessRef.update({
    user: firebase.firestore.FieldValue.arrayUnion(uid),
  });
};

export const updateBusinessProfileLogo = async (userId: string, mediaId: string) => {
  await BUSINESS_COLLECTION.doc(userId).update({ mediaId });
};

export const removeUserFromBusiness = async (businessId: string, uid: string) => {
  const business = (await BUSINESS_COLLECTION.doc(businessId).get()).data();
  const { user } = business;
  const usersArray = user.filter((user) => user !== uid);
  return await BUSINESS_COLLECTION.doc(businessId).update({ user: usersArray });
};

export const getBusinessWithDetailsById = async (businessId: string) => {
  const business: BusinessInterface = await getBusinessById(businessId);
  const businessDetails = await getBusinessFields(business);
  return {
    ...business,
    ...businessDetails,
  };
};

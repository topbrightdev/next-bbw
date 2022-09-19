import { collectionNames } from "../../utils/constants";
import { CandidateInterface, AddCandidateInterface } from "./types";
import { db } from "../../config/firebase";
import { getCandidateRoleById } from "@services/CandidateRoles";
import { getCategoryById } from "./../Category/index";
import { getEmailById } from "@services/Email";
import { getPhoneById } from "@services/Phone";
import { getSkillsById } from "@services/Skill";
import { getCandidateRateById } from "@services/CandidateRates";
import { CANDIDATE_STATUS_LIST } from "./../../utils/constants";

const converter = {
  fromFirestore: (snapshot) => snapshot.data() as CandidateInterface,
  toFirestore: (data: Partial<CandidateInterface>) => data,
};

const CANDIDATES_COLLECTION = db.collection(collectionNames.CANDIDATES_COLLECTION).withConverter(converter);

const getCandidateById = async (id: string) => {
  const doc = await CANDIDATES_COLLECTION.doc(id).get();
  return { ...doc.data(), id: doc.id };
};

const getCandidates = async () => {
  const candidates = await CANDIDATES_COLLECTION.get();
  return candidates.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

const getCandidateFields = async ({ ...candidate }: CandidateInterface) => {
  const { candidateRoleId, candidateRates, categoryId, email, phone, skills, preferedRoles } = candidate;
  const [ratesData, roleData, categoryData, emailData, phoneData, skillsData, preferedRolesData] = await Promise.all([
    Promise.all([
      getCandidateRateById(candidateRates.hourly),
      getCandidateRateById(candidateRates.monthly),
      getCandidateRateById(candidateRates.yearly),
    ]),
    candidateRoleId ? getCandidateRoleById(candidateRoleId) : null,
    categoryId ? getCategoryById(categoryId) : null,
    email ? getEmailById(email) : null,
    phone ? getPhoneById(phone) : null,
    Array.isArray(skills) ? Promise.all(skills.map((sid) => getSkillsById(sid))) : Promise.resolve([]),
    Array.isArray(preferedRoles) ? Promise.all(preferedRoles.map((prid) => getCandidateRoleById(prid))) : Promise.resolve([]),
  ]);

  const output = {
    candidateRates: ratesData
      ? { hourly: ratesData[0], monthly: ratesData[1], yearly: ratesData[2] }
      : { hourly: "", monthly: "", yearly: "" },
    candidateRoleId: roleData ? { id: roleData.id, name: roleData.name } : { id: "", name: "" },
    email: emailData ? { id: emailData.id, email: emailData.email } : { id: "", email: "" },
    phone: phoneData ? { id: phoneData.id, phone: phoneData.phone } : { id: "", phone: "" },
    categoryId: categoryData ? { id: categoryData.id, name: categoryData.name } : { id: "", name: "" },
    skills: Array.isArray(skillsData) ? skillsData.map((c) => ({ id: c.id, title: c.title })) : [],
    preferedRoles: Array.isArray(preferedRolesData) ? preferedRolesData.map((prid) => ({ id: prid.id, name: prid.name })) : [],
  };

  return output;
};

const addCandidate = async (candidate: AddCandidateInterface) => {
  const newCandidate = CANDIDATES_COLLECTION.doc();
  await newCandidate.set(candidate as CandidateInterface);
  return newCandidate.id;
};

const getCandidateWithDetailsById = async (id: string) => {
  const candidate: CandidateInterface = await getCandidateById(id);
  const candidateDetails = await getCandidateFields(candidate);
  return {
    ...candidate,
    ...candidateDetails,
  };
};

const getCandidatesByFilter = async (candidates, filters) => {
  const filteredCandidates = candidates
    .filter((candidate) => (filters.location.values.length ? filters.location.values.includes(candidate.location) : true))
    .filter((candidate) => {
      if (!filters.skills.values.length) return true;
      for (const skill of candidate.skills) {
        if (filters.skills.values.includes(skill.id)) return true;
      }
      return false;
    })
    .filter((candidate) =>
      filters.experience.values.length
        ? candidate.yearsOfExperience >= filters.experience.values[0] && candidate.yearsOfExperience <= filters.experience.values[1]
        : true,
    )
    .filter((candidate) => {
      if (!filters.salary.values.length) return true;
      const { values } = filters.salary;
      const {
        // candidateRates: { hourly, monthly, yearly },
        candidateRates: { yearly },
      } = candidate;
      // if (hourly.amount >= values[0] && hourly.amount <= values[1]) return true;
      // else if (monthly.amount >= values[0] && monthly.amount <= values[1]) return true;
      // else if (yearly.amount >= values[0] && yearly.amount <= values[1]) return true;
      if (yearly.amount >= values[0] && yearly.amount <= values[1]) return true;
      else return false;
    })
    .filter((candidate) =>
      filters.status.values[0] !== CANDIDATE_STATUS_LIST[0].value && filters.status.values.length
        ? filters.status.values.includes(candidate.status)
        : true,
    );
  return filteredCandidates;
};

export { addCandidate, getCandidateById, getCandidates, getCandidateFields, getCandidateWithDetailsById, getCandidatesByFilter };

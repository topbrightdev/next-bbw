export const CANDIDATE_STATUS_LIST = [
  { label: "Any", value: "ANY" },
  { label: "Ready to interview", value: "READY_TO_INTERVIEW" },
  { label: "Open to offers", value: "OPEN_TO_OFFERS" },
  { label: "Unavailable for jobs", value: "UNAVAILABLE_FOR_JOBS" },
];

export const CANDIDATE_SALARY_RANGES = {
  hourly: [20, 80],
  monthly: [2000, 10000],
  anually: [0, 500000],
};

export const CANDIDATE_EXPERIENCE_RANGE = [0, 80];
export const otpExpiry = 1000 * 60 * 30;
export const loggedInPaths = [
  "/Business/[business]",
  "/businesses",
  "/teams",
  "/edit-profile",
  "/Partner/[partner]",
  "/contact",
  "/edit-company",
  "/recruiting",
  "/partners",
  "/login",
];
export const DefaultValues = {
  BUSINESS: "BUSINESS",
  PARTNER: "PARTNER",
  USER: "USER",
  ADMIN: "admin",
};
export const collectionNames = {
  USERS_COLLECTION: "users",
  EMAILS_COLLECTION: "email",
  PHONE_COLLECTION: "phone",
  ADDRESS_COLLECTION: "address",
  BUSINESS_COLLECTION: "business",
  SKILLS_COLLECTION: "skills",
  SOLICITATION_REQUIREMENTS_COLLECTION: "solicitation_requirement",
  NAICS_COLLECTION: "naics",
  CERTIFICATION_COLLECTION: "certification",
  CONTRACTS_COLLECTION: "contracts",
  PRESS_RELEASE_COLLECTION: "press_release",
  COMMITMENT_COLLECTION: "commitment",
  CATEGORY_COLLECTION: "category",
  SUB_CATEGORY_COLLECTION: "subcategory",
  MEDIA_COLLECTION: "media",
  CANDIDATES_COLLECTION: "candidates",
  CANDIDATES_RATES_COLLECTION: "candidates_rates",
  CANDIDATES_ROLES_COLLECTION: "candidates_roles",
};

export const storageFolderNames = {
  AVATAR_FOLDER: "images/avatar",
  LOGOS_FOLDER: "images/logos",
  IMAGES_FOLDER: "images",
  RESUMES_FOLDER: "resumes",
};

export const businessCategory = [
  { value: { weight: ">=", revenue: 0 }, label: "All Size", type: "size" },
  {
    value: { weight: ">=", revenue: 750000 },
    label: "Enterprise",
    type: "size",
  },
  { value: { weight: "<", revenue: 750000 }, label: "Small", type: "size" },
];

export const defaultState = [
  { value: "ALL", label: "Filter by state", type: "state" },
  { value: "WA", label: "Washington", type: "state" },
  { value: "OR", label: "Oregon", type: "state" },
];

export const allowedImageExtensions = ["png", "jpg", "jpeg"];
export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const userStatus = {
  PENDING: "ACCEPTED",
  ACCEPTED: "ACTIVE",
  ACTIVE: "",
};

export const emailTemplates = {
  INVITE_USER: "d-baaacbb7b81046cc98a222ce8aca89ba",
  INVITE_USER_CONFIRMATION: null,
};

export const EmployeeSize = [
  { label: "0-10", value: "0-10" },
  { label: "10-20", value: "10-20" },
  { label: "20-50", value: "20-50" },
  { label: "50-100", value: "50-100" },
  { label: "100-200", value: "50-100" },
  { label: "200-500", value: "200-500" },
  { label: "500-800", value: "500-800" },
  { label: "800-1000", value: "800-1000" },
  { label: "More than 1000", value: "More than 1000" },
];

export const OpportunityTypes = [
  { label: "Select", value: "", isDisabled: true },
  { label: "General Solicitation", value: "General Solicitation" },
  { label: "Program", value: "Program" },
  { label: "Resource", value: "Resource" },
];

export const otpBypassAccounts = [
  "connecting@example.org",
  "trading@example.org",
  "business@example.org",
  "harris.mir@bytemage.io",
  "harris.mir+part@bytemage.io",
];

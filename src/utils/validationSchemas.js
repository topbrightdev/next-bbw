import * as yup from "yup";

export const emailValidationSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
});

export const profileSettingsValidationSchema = yup.object().shape({
  firstName: yup.string().required().label("First name"),
  lastName: yup.string().required().label("Last name"),
  email: yup.string().email().required().label("Email"),
  role: yup.string().required().label("Role"),
  phone: yup.string().optional().label("Phone number"),
  mediaId: yup.string().optional().label("Avatar"),
});

export const profileSettingsFormFields = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Company", name: "company", props: { disabled: true } },
  { label: "Email", name: "email" },
  { label: "Role", name: "role", props: { disabled: true } },
  { label: "Phone", name: "phone" },
];

export const profileSettingsInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  company: "",
  phone: "",
  mediaId: "",
};

export const businessOverViewValidationSchema = yup.object().shape({
  companyName: yup.string().required("This field is required"),
  industryType: yup.string().required("This field is required"),
  employeeSize: yup.string().required("This field is required"),

  about: yup.string().required("This field is required"),
  services: yup.array(),
  certifications: yup.array(),
  news: yup.array().of(
    yup.object().shape({
      businessId: yup.string(),
      source: yup.string(),
    }),
  ),
});
export const businessOverViewVFormFields = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "eg.Apple",
    type: "text",
    fieldSize: "half",
  },
  {
    label: "Industry Type",
    name: "industryType",
    placeholder: "Select your category",
    type: "select",
    fieldSize: "half",
  },
  {
    label: "Employee Size",
    name: "employeeSize",
    placeholder: "Number of workers",
    type: "select",
    fieldSize: "full",
  },

  {
    label: "About",
    name: "about",
    placeholder: "Description",
    type: "textarea",
    fieldSize: "full",
  },
  {
    label: "Services",
    name: "services",
    placeholder: "Select Service (max 5)",
    type: "select",
    fieldSize: "full",
  },
  {
    label: "Certifications",
    name: "certifications",
    placeholder: "Select Certifications",
    type: "select",
    fieldSize: "full",
  },
  {
    label: "News",
    name: "news",
    placeholder: "Link",
    type: "text",
    fieldSize: "half",
  },
];

export const businessOverViewInitialValues = {
  companyName: "",
  industryType: "",
  employeeSize: "",

  about: "",
  services: "",
  certifications: "",
  news: "",
};

export const businessContactInfoSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("This field is required"),
  phone: yup.string().required("This field is required"),
  website: yup
    .string()
    .transform((text) => (text.startsWith("http") ? text : `https://${text}`))
    .url("Enter a valid website URL")
    .required("This field is required"),
  state: yup.string().required("This field is required"),
  city: yup.string().required("This field is required"),
});

export const businessContactInfoFormFields = [
  { label: "Email", name: "email", placeholder: "example@gmail.com" },
  { label: "Phone", name: "phone", placeholder: "(---)--- -- --" },
  { label: "Website", name: "website", placeholder: "www.yourwebsite.com" },
  { label: "State", name: "state", placeholder: "Your State" },
  { label: "City", name: "city", placeholder: "Your City" },
];

export const businessContactInfoInitialValues = {
  email: "",
  phone: "",
  website: "",
  state: "",
  city: "",
};

export const businessSnapShotSchema = yup.object().shape({
  president: yup.string().required("This field is required"),
  yearFounded: yup.string().required("This field is required"),
});
export const businessSnapShotInitialValues = {
  president: "",
  yearFounded: "",
};
export const businessSnapShotFormFields = [
  { label: "President", name: "president", placeholder: "President Name" },
  { label: "Year Founded", name: "yearFounded", placeholder: "Year Founded" },
];
export const partnerDoingBusinessSchema = yup.object().shape({
  doing_business: yup.string().required("This field is required"),
});
export const partnerDoingBusinessInitialValues = {
  doing_business: "",
};
export const partnerDoingBusinessFormFields = [
  {
    label: "Doing Business",
    name: "doing_business",
    placeholder: "Doing Business",
    type: "textarea",
  },
];
export const partnerCommitmentSchema = yup.object().shape({
  commitment: yup.string().required("This field is required"),
});
export const partnerCommitmentInitialValues = {
  commitment: "",
};
export const partnerCommitmentFormFields = [
  {
    label: "Commitment",
    name: "commitment",
    placeholder: "Commitment",
    type: "textarea",
  },
];

export const partnerAboutValidationSchema = yup.object().shape({
  companyName: yup.string().required("This field is required"),
  industryType: yup.string().required("This field is required"),
  about: yup.string().required("This field is required"),
  services: yup.array().min(1, "Select at least 1 option").required("This field is required"),
  employeeSize: yup.string().required("This field is required"),
  city: yup.string().required("This field is required"),
  yearFounded: yup.string().required("This field is required"),
  website: yup.string().required("This field is required"),
  email: yup.string().email("Enter a valid email").required("This field is required"),
  phone: yup.string().required("This field is required"),
  state: yup.string().required("This field is required"),
});
export const partnerAboutFormFields = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "eg.Apple",
    type: "text",
    fieldSize: "half",
  },
  {
    label: "Corporate Type",
    name: "industryType",
    placeholder: "Select your category",
    type: "select",
    fieldSize: "half",
  },
  {
    label: "Services",
    name: "services",
    placeholder: "Select Service (max 5)",
    type: "select",
    fieldSize: "full",
  },
  {
    label: "Employee Size",
    name: "employeeSize",
    placeholder: "Number of workers",
    type: "select",
    fieldSize: "half",
  },
  {
    label: "State",
    name: "state",
    placeholder: "Your State",
    type: "select",
    fieldSize: "half",
  },
  {
    label: "City",
    name: "city",
    placeholder: "Location or remote",
    type: "select",
    fieldSize: "half",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "example@gmail.com",
    type: "text",
    fieldSize: "half",
  },
  {
    label: "Phone",
    name: "phone",
    placeholder: "(---)--- -- --",
    type: "text",
    fieldSize: "half",
  },
  {
    label: "Year Founded",
    name: "yearFounded",
    placeholder: "YYYY",
    type: "select",
    fieldSize: "half",
  },
  {
    label: "About",
    name: "about",
    placeholder: "Description",
    type: "textarea",
    fieldSize: "full",
  },

  {
    label: "Company Website Link",
    name: "website",
    placeholder: "https://www.example.com",
    type: "text",
    fieldSize: "half",
  },
];

export const partnerAboutInitialValues = {
  companyName: "",
  industryType: "",
  employeeSize: "",
  city: "",
  yearFounded: "",
  about: "",
  state: "",
  email: "",
  phone: "",
  services: "",
  website: "",
};

export const partnerOpportunitiesSchema = yup.object().shape({
  opportunityName: yup.string().required("This field is required"),
  opportunityType: yup.string().required("This field is required"),
  about: yup.string().required("This field is required"),
  additionalResources: yup.array().of(yup.string()),
  id: yup.string(),
});

export const partnerOpportunitiesFormFields = [
  {
    label: "Opportunity Name",
    name: "opportunityName",
    placeholder: "Opportunity Title",
  },
  {
    label: "Opportunity Type",
    name: "opportunityType",
    placeholder: "Select Opportunity Type",
  },
  {
    label: "About Opportunity",
    name: "about",
    placeholder: "Description",
  },
  {
    label: "Additional Resources",
    name: "additionalResources",
    placeholder: "Link",
  },
];

export const partnerOpportunitiesInitialValues = {
  opportunityName: "",
  opportunityType: "",
  about: "",
  additionalResources: "",
  id: "",
};

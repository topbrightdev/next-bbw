export interface User {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  pronoun?: string;
  race?: string;
  emailAddresses: string[];
  phoneNumbers: string[];
}

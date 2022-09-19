export enum UserStatus {
  PENDING = "PENDING",
  FIRST_LOGIN = "FIRST_LOGIN",
  ACTIVE = "ACTIVE",
}

export interface UserInterface {
  id: string;
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  firstName: string;
  lastName: string;
  middleName: string;
  pronoun?: string;
  race?: string;
  email: string[];
  phone: string[];
  parentId: string;
  role: string;
  mediaId?: string;
  occupation: string;
  status: UserStatus;
}

export interface AddUserInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  pronoun?: string;
  race?: string;
  email: string[];
  phone?: string[];
  parentId: string;
  role: string;
  occupation?: string;
  mediaId?: string;
  status?: UserStatus;
}

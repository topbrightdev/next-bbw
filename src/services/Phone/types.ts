export interface PhoneInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  phone: string;
  parentType: string;
  parentId: string;
  isVerified?: false;
  type?: string;
}

export interface AddPhoneInterface {
  phone: string;
  parentId?: string;
  parentType?: string;
}

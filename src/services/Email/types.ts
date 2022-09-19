export interface EmailInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;

  parentType?: string;
  parentId: string;
  email: string;
  isVerified?: boolean;
  sendEmailNotifications?: boolean;
}

export interface AddEmailInterface {
  email: string;
  parentId?: string;
  parentType?: string;
}

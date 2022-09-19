export interface Email {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;

  parentType: string;
  parentId: string;
  email: string;
  isVerified: boolean;
  sendEmailNotifications: boolean;
}

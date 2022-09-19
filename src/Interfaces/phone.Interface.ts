export interface Phone {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;

  parentType: string;
  parentId: string;
  isVerified: false;
  type: string;
}

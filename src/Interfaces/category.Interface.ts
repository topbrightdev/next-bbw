export interface Category {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;
  name: string;
  subcategoryId: string;
}

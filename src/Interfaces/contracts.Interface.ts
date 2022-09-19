export interface Contracts {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;
  userId: string;
  categoryId: string;
  businessId: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface ContractsInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  userId: string;
  categoryId: string;
  businessId: string;
  title: string;
  description: string;
  isActive: boolean;
  type: string;
  additionalResources?: string[];
}

export interface AddContractsInterface {
  userId: string;
  categoryId: string;
  businessId: string;
  title: string;
  description: string;
  isActive?: boolean;
  type: string;
  additionalResources?: string[];
}

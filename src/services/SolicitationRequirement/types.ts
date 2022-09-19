export interface SolicitationRequirementsInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  businessId: string;
  title: string;
  description: string;
}

export interface AddSolicitationRequirementsInterface {
  businessId: string;
  title: string;
  description: string;
}

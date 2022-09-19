export interface SolicitationRequirements {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;
  businessId: string;
  title: string;
  description: string;
}

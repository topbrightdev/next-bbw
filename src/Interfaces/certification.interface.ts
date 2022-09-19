export interface Certification {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;
  businessId: string;
  name: string;
  description: string;
  region?: string;
  isVerified: boolean;
}

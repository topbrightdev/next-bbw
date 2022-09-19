export interface CertificationInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  businessId: string;
  name: string;
  description: string;
  region?: string;
  isVerified: boolean;
}

export interface AddCertificationInterface {
  businessId: string;
  name: string;
  description: string;
  region?: string;
  isVerified: boolean;
}

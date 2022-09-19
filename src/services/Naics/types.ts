export interface NaicsInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  businessId: string;
  name: string;
  localizedName: string;
  isVerified: boolean;
}

export interface AddNaicsInterface {
  businessId: string;
  name: string;
  localizedName: string;
  isVerified?: boolean;
}

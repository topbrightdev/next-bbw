export interface CommitmentInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  businessId: string;
  title: string;
  description: string;
}

export interface AddCommitmentInterface {
  businessId: string;
  title: string;
  description: string;
}

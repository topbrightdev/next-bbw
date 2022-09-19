export interface CandidateRolesInterface {
  id: string; // auto-increment
  createdBy: string;
  modifiedBy: string;
  modifiedOn: string;
  name: string;
  description: string;
}

export interface AddCandidateRolesInterface {
  name: string;
  description?: string;
}

export interface CandidatesRatesInterface {
  hourly: string;
  monthly: string;
  yearly: string;
}
export interface CandidateInterface {
  id?: string; // auto-increment
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: string;
  company: string; //The company at which the candidate currently works
  firstName: string;
  lastName?: string;
  location: string;
  candidateRoleId: string; //The candidate’s current title
  candidateRates: CandidatesRatesInterface; // {hourly:candidateRateId, monthly:candidateRateId, annually:candidateRateId}
  application?: string[]; //Array of application IDs associated with this candidate. Can contain none, one, or several application IDs.
  background: string; //this will be "What they are looking for"
  email: string;
  phone: string;
  categoryId: string; //ref category ID
  yearsOfExperience: number;
  skills: string[]; // [skilsId,etc]
  status: "READY_TO_INTERVIEW" | "NOT_LOOKING" | "OPEN_TO_OFFERS" | "UNAVAILABLE_FOR_JOBS"; //ready to interview, not looking, Ready to interview, Open to offers, Unavailable for jobs
  preferedRoles: string[];
}
export interface AddCandidateInterface {
  company: string; //The company at which the candidate currently works
  firstName: string;
  lastName?: string;
  location: string;
  candidateRoleId: string; //The candidate’s current title
  candidateRates: CandidatesRatesInterface; // {hourly:candidateRateId, monthly:candidateRateId, annually:candidateRateId}
  application?: string[]; //Array of application IDs associated with this candidate. Can contain none, one, or several application IDs.
  background: string; //this will be "What they are looking for"
  email: string;
  phone: string;
  categoryId: string; //ref category ID
  yearsOfExperience: number;
  skills: string[]; // [skilsId,etc]
  status: "READY_TO_INTERVIEW" | "NOT_LOOKING" | "OPEN_TO_OFFERS" | "UNAVAILABLE_FOR_JOBS"; //ready to interview, not looking, Ready to interview, Open to offers, Unavailable for jobs
  preferedRoles?: string[];
}

export interface CandidateRatesInterface {
  id: string;
  createdBy: string;
  modifiedBy: string;
  modifiedOn: string;
  amount: number;
  type: "HOURLY" | "MONTHLY" | "ANNUALLY";
}
export interface AddCandidateRatesInterface {
  amount: number;
  type: "HOURLY" | "MONTHLY" | "ANNUALLY";
}

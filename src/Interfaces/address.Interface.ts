export interface Address {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  state: string;
  zipCode: string;
}

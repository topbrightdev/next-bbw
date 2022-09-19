export interface AddressInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  addressOne: string;
  addressTwo: string;
  city: string;
  state: string;
  zipCode: string;
  parentId: string;
  parentType: string;
}

export interface AddAddressInterface {
  addressOne: string;
  addressTwo: string;
  city: string;
  state: string;
  zipCode: string;
  parentId?: string;
  parentType?: string;
}

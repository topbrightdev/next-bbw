export interface Business {
  id: number;
  createdOn: string;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: string;
  addressID: string;
  userId: string[];
  phoneNumberID: string[];
  name: string;
  description: string;
  revenue: number;
  industryId: string;
  employees: number;
  yearFounded: number;
  mediaID: string[];
  type?: string;
  website: string;
  isActive: boolean;
}

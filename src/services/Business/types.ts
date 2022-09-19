export enum BusinessType {
  BUSINESS = "BUSINESS",
  CONNECTING = "PARTNER CONNECTING",
  TRADING = "PARTNER TRADING",
}

export interface BusinessInterface {
  id: string;
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  address: string[];
  user: string[];
  phone: string[];
  email: string[];
  name: string;
  description: string;
  revenue: number;
  categoryId: string;
  subcategory: string[];
  employees: number;
  yearFounded: number;
  mediaId?: string; // media id -> only used for logo
  type: BusinessType | "BUSINESS" | "PARTNER CONNECTING" | "PARTNER TRADING"; // remove BusinessType for frontend
  website: string;
  isActive: boolean;
  city: string;
  state: string;
  news?: string[]; // Did Mark ask to keep this here?
  certification: string[]; // id of certification
}

export interface AddBusinessInterface {
  address: string[];
  user: string[];
  phone: string[];
  certification: string[];
  name: string;
  description: string;
  categoryId: string;
  subcategory: string[];
  revenue: number;
  mediaId?: string;
  employees: number;
  yearFounded: number;
  website: string;
  city: string;
  state: string;
  type: string;
  news?: string[];
}

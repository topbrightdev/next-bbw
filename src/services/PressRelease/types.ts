export interface PressReleaseInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  businessId: string;
  title: string;
  description: string;
  source: string;
}

export interface AddPressReleaseInterface {
  businessId: string;
  title?: string;
  description?: string;
  source: string;
}

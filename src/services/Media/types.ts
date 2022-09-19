export interface MediaInterface {
  id: string;
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;
  parentId?: string;
  parentType?: string;
  source: string;
  type: string;
}

export interface AddMediaInterface {
  source: string;
  type?: string;
  parentId?: string;
  parentType?: string;
}

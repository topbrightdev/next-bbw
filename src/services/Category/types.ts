import { SubcategoryInterface } from "@services/Subcategory/types";

interface KeyToSubcategory {
  [key: string]: SubcategoryInterface;
}

export interface CategoryTransfomerInterface {
  createdOn: number;
  createdBy: string;
  modifiedBy?: string;
  modifiedOn?: number;

  name: string;
  subcategory: KeyToSubcategory;
}

export interface CategoryInterface {
  createdOn?: number;
  createdBy?: string;
  modifiedBy?: string;
  modifiedOn?: number;

  name: string;
  subcategory: Array<string>;
}

export interface AddCategoryInterface {
  name: string;
}

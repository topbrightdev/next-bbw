//PACKAGES
import { FC } from "react";
interface HandleFilterRemoveProps {
  type: string;
  objectKey: string;
  value: any;
}

export interface FilterChipProps {
  type: string;
  value: any;
  objectKey: string;
  isRange?: boolean;
  label: string;
  handleFilterRemove(props: HandleFilterRemoveProps): any;
}

//IMAGES
import cancel from "@image/cancel-white.svg";

// const FilterChip: FC<FilterChipProps> = ({ keyType, data, type, range, handleFilterRemove }) => {
const FilterChip: FC<FilterChipProps> = ({ type, value, objectKey, label, handleFilterRemove }) => {
  return (
    <div className="d-flex align-items-center bg-primary text-white px-4 py-1 ml-3 my-1 rounded-pill shadow">
      <div className="font-size-4">{label}</div>

      <div className="ml-3 d-flex">
        <img
          src={cancel}
          onClick={() => handleFilterRemove({ type, objectKey, value })}
          className="pointer"
          alt="cancel"
          width="11"
          height="11"
        />
      </div>
    </div>
  );
};

export default FilterChip;

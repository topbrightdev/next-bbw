//PACKAGES
import { FC } from "react";
import { Radio, Space } from "antd";

// COMPONENTS
import { Select } from "@components/Core";
import Button from "@components/Common/Button";
import Slider from "@components/Common/Slider";

//CONTEXT

//CONSTANTS
import { CANDIDATE_STATUS_LIST, CANDIDATE_SALARY_RANGES, CANDIDATE_EXPERIENCE_RANGE } from "@utils/constants";

//LOGO
import cancel from "@image/svg/cancel.svg";

// UTILS
import { format } from "@utils/index";

interface SkillsProps {
  key: string;
  label: string;
  value: string;
}
interface LocationProps {
  key: string;
  label: string;
  value: string;
}
interface HandleFilterProps {
  key: string;
  value: any;
  label?: string;
}
interface FilterCandidateProps {
  skills: SkillsProps[];
  locations: LocationProps[];
  handleFilters(arg: HandleFilterProps): void;
  handleApplyFilters(): void;
  handleFilterCandidateSlideOver(): void;
  filters: any;
}

const { formatCurrency } = format;

const FilterCandidate: FC<FilterCandidateProps> = ({
  skills,
  locations,
  handleFilterCandidateSlideOver,
  handleFilters,
  handleApplyFilters,
  filters,
}) => {
  const minSalary = formatCurrency(CANDIDATE_SALARY_RANGES.anually[0]);
  const maxSalary = formatCurrency(CANDIDATE_SALARY_RANGES.anually[1]);
  return (
    <>
      <div className="py-6 px-10 d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid #E7E9ED" }}>
        <div>
          <h5 className="font-size-6  text-black">Filters</h5>
        </div>
        <div>
          <img onClick={handleFilterCandidateSlideOver} className="pointer" src={cancel} alt="cancel" />
        </div>
      </div>
      <div className="px-10 my-5 mt-5">
        <div>
          <h5 className="font-size-4 text-black">Location</h5>
        </div>
        <Select
          value={locations.filter((location) => filters.location.values.includes(location.value))}
          options={locations}
          isMultiSelect={true}
          className="font-size-4"
          css={`
            min-width: 175px;
          `}
          sendFilters={(value) => {
            const arrayOfValues = value ? value.map((val) => val.value) : [];
            handleFilters({ key: "location", value: arrayOfValues });
          }}
        />
      </div>
      <div className="px-10 my-5 mt-10">
        <div>
          <h5 className="font-size-4 text-black">Skills</h5>
        </div>
        <Select
          value={skills.filter((skill) => filters.skills.values.includes(skill.value))}
          options={skills}
          isMultiSelect={true}
          className="font-size-4"
          css={`
            min-width: 175px;
          `}
          sendFilters={(value) => {
            const arrayOfValues = value ? value.map((val) => val.value) : [];
            handleFilters({ key: "skills", value: arrayOfValues });
          }}
        />
      </div>
      <div className="px-10 my-5 mt-10">
        <div>
          <h5 className="font-size-4 text-black">Experience</h5>
          <p className="font-size-3 d-flex justify-content-between">
            <span>{CANDIDATE_EXPERIENCE_RANGE[0]}</span>
            <span>{CANDIDATE_EXPERIENCE_RANGE[1]}</span>
          </p>
          {/* @ts-ignore */}
          <Slider
            min={CANDIDATE_EXPERIENCE_RANGE[0]}
            max={CANDIDATE_EXPERIENCE_RANGE[1]}
            defaultValue={filters.experience.values.length ? filters.experience.values : CANDIDATE_EXPERIENCE_RANGE}
            onChange={(value, _) => handleFilters({ key: "experience", value })}
          />
        </div>
      </div>
      <div className="px-10 my-5 mt-10">
        <div>
          <h5 className="font-size-4 text-black">Salary per year</h5>
          <p className="font-size-3 d-flex justify-content-between">
            <span>${minSalary}</span>
            <span>${maxSalary}</span>
          </p>
          {/* @ts-ignore */}
          <Slider
            pill
            min={CANDIDATE_SALARY_RANGES.anually[0]}
            max={CANDIDATE_SALARY_RANGES.anually[1]}
            defaultValue={filters.salary.values.length ? filters.salary.values : CANDIDATE_SALARY_RANGES.anually}
            valueFormatter={(value) => `$${formatCurrency(value)}`}
            onChange={(value, _) => handleFilters({ key: "salary", value })}
          />
        </div>
      </div>
      <div className="px-10 my-5 mt-10">
        <div>
          <h5 className="font-size-4 text-black">Status</h5>
          <Radio.Group
            onChange={(e) => handleFilters({ key: "status", value: e.target.value })}
            defaultValue={filters.status.values[0]}
          >
            <Space direction="vertical">
              {CANDIDATE_STATUS_LIST.map((item) => (
                <Radio style={{ marginTop: 10 }} key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      </div>
      <div className="">
        {/* @ts-ignore*/}
        <Button dark medium handleClick={handleApplyFilters} fullWidth text="Apply">
          Apply
        </Button>
      </div>
    </>
  );
};

export default FilterCandidate;

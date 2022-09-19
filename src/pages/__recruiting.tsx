//PACKAGES
import nookies from "nookies";
import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { Drawer } from "antd";
//COMPONENTS
import SearchBar from "@components/Common/SearchBar";
import LoggedInLayout from "../components/Layout/LoggedInLayout";
import CandidateCard from "@components/CandidateCard";
import { CandidateInterface } from "@services/Candidates/types";
import ModalCandidateDetail from "@components/ModalCandidateDetail";
import { Button } from "@components/Common";
import FilterChip, { FilterChipProps } from "@components/Common/FilterChip";
//SERVICES
import { getCandidates, getCandidateWithDetailsById, getCandidatesByFilter } from "@services/Candidates";
import { algoliaSearch } from "@services/AlgoliaSearch/AlgoliaSearch";

//SECTIONS

//CONTEXT
import DataContext from "@context/DataContext";
import GlobalContext from "@context/GlobalContext";
import { useRouter } from "next/router";
import FilterCandidate from "@components/FilterCandidate";
import { getSkills } from "@services/Skill";

//LOGOS
import filtersLogo from "@image/svg/filters.svg";
import { CANDIDATE_STATUS_LIST } from "../utils/constants";

//INTERFACES
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
interface RecruitingProps {
  totalCandidates: CandidateInterface[];
  skills: SkillsProps[];
  locations: LocationProps[];
}

interface HandleFilterRemoveProps {
  type: string;
  objectKey: string;
  value: any;
}

const Recruiting: NextPage<RecruitingProps> = ({ totalCandidates, skills, locations }) => {
  //ROUTER
  const router = useRouter();
  //CONTEXT
  const { toggleCandidateDetailModal, candidateFilterSlideOverVisible, toggleCandidateFilterSlideOver } = useContext(GlobalContext);
  const { currentUser, loading } = useContext(DataContext);

  //STATE
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState(totalCandidates);
  const [filters, setFilters] = useState({
    location: { type: "array", values: [] },
    skills: { type: "array", values: [] },
    experience: { type: "range", values: [] },
    salary: { type: "range", values: [] },
    status: { type: "value", values: [CANDIDATE_STATUS_LIST[0].value] },
  });
  const [filterChips, setFilterChips] = useState<Partial<FilterChipProps>[]>([]);

  //USE_EFFECT

  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/");
    } else if (router.pathname.match(/__recruiting/)) {
      router.back();
    }
  }, [loading]);

  //EVENT_HANDLERS
  const callBackFunction = async (query: string) => {
    const candidates = await algoliaSearch.searchCandidates(query);
    if (Array.isArray(candidates)) {
      candidates.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setCandidates(candidates);
    }
  };
  const handleSelectCandidate = async (id) => {
    const data = candidates.find((candidate) => candidate.id === id);
    setSelectedCandidate(data);
    toggleCandidateDetailModal();
  };
  const handleFilterCandidateSlideOver = () => {
    toggleCandidateFilterSlideOver();
  };

  const handleFilterRemove = async ({ type, objectKey, value }: HandleFilterRemoveProps) => {
    const newFilters = { ...filters };
    if (type === "range" || type === "value") {
      newFilters[objectKey].values = [];
    } else {
      const index = newFilters[objectKey].values.indexOf(value);
      if (index > -1) {
        newFilters[objectKey].values.splice(index, 1);
      }
    }

    setFilters(newFilters);
    handleApplyFilters();
  };

  const handleFilterUpdate = ({ key, value }) => {
    const newFilters = { ...filters };
    if (newFilters[key]) {
      if (newFilters[key].type !== "value") {
        if ((newFilters[key].type === "range" || newFilters[key].type === "array") && Array.isArray(value)) {
          newFilters[key].values = value;
        }
      } else {
        newFilters[key].values = [value];
      }
    }
    setFilters(newFilters);
  };

  const handleApplyFilters = async () => {
    const myFilterChips = [];
    for (const objectKey in filters) {
      const { type, values } = filters[objectKey];
      let isRange = false;
      let label = "";
      for (const value of values) {
        switch (objectKey) {
          case "location":
            label = value;
            break;
          case "skills":
            label = skills.find((s) => s.value === value)?.label || "";
            break;
          case "status":
            label = CANDIDATE_STATUS_LIST.find((s) => s.value === value)?.label || "";
            break;
          default:
            break;
        }
        if (objectKey !== "experience" && objectKey !== "salary") myFilterChips.push({ isRange, type, label, value, objectKey });
      }
      if ((objectKey === "experience" || objectKey === "salary") && values.length) {
        isRange = true;
        label = `${values[0].toLocaleString("en-US", { maximumFractionDigits: 0 })} - ${values[1].toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })} ${objectKey === "experience" ? "years" : "USD"}`;
        myFilterChips.push({ isRange, type, label, value: values, objectKey });
      }
    }
    setFilterChips(myFilterChips);
    // send filters to candidates service
    const filteredCandidates = await getCandidatesByFilter(totalCandidates, filters);
    // get list of candidates based on filters
    setCandidates(filteredCandidates);
    // update local candidate list
    candidateFilterSlideOverVisible && handleFilterCandidateSlideOver();
  };

  const renderFiltersView = () => {
    return (
      <Drawer
        title="Filters"
        placement="right"
        onClose={toggleCandidateFilterSlideOver}
        visible={candidateFilterSlideOverVisible}
        key="right"
        closable={true}
        headerStyle={{ display: "none", flexDirection: "row-reverse", fontSize: 36, fontWeight: 4 }}
        bodyStyle={{ margin: 0, padding: 0 }}
        style={{ zIndex: 2000 }}
      >
        <FilterCandidate
          skills={skills}
          locations={locations}
          handleFilters={handleFilterUpdate}
          handleApplyFilters={handleApplyFilters}
          filters={filters}
          handleFilterCandidateSlideOver={handleFilterCandidateSlideOver}
        />
      </Drawer>
    );
  };

  const renderFilterChips = () => {
    return (
      <div className="d-flex flex-wrap">
        {filterChips.map((chip, ind) => (
          <FilterChip
            key={`filter-chip-${chip.objectKey}-${ind}`}
            type={chip.type}
            objectKey={chip.objectKey}
            value={chip.value}
            label={chip.label}
            isRange={chip.isRange}
            handleFilterRemove={handleFilterRemove}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <LoggedInLayout contactModal={false}>
        {renderFiltersView()}
        <ModalCandidateDetail selectedCandidate={selectedCandidate} />
        <div className="row justify-content-center bg-default-1 pb-19 pt-0 mt-0 ">
          <div className="col-12">
            <div className="row d-flex">
              <div className="col-10">
                <SearchBar parentCallback={callBackFunction} />
              </div>
              <div className="d-flex justify-content-end align-items-center col-2">
                {/* @ts-ignore*/}

                <Button text="Filters" medium dark uppercase handleClick={handleFilterCandidateSlideOver} logo={filtersLogo} />
              </div>
            </div>
            <div className="col-12 mt-8">{renderFilterChips()}</div>
            <div className="mt-5">
              {candidates
                ? candidates.map((candidate, index) => (
                    <CandidateCard
                      key={index}
                      id={candidate?.id}
                      status={candidate?.status}
                      firstName={candidate?.firstName}
                      lastName={candidate?.lastName}
                      role={candidate?.candidateRoleId}
                      experience={candidate?.yearsOfExperience}
                      location={candidate?.location}
                      yearly={candidate?.candidateRates?.yearly}
                      skills={candidate?.skills}
                      handleSelectCandidate={handleSelectCandidate}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </LoggedInLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { userId } = nookies.get(context);
  if (!userId) {
    return {
      props: {},
    };
  }
  const candidateResult = await getCandidates();
  const totalCandidates = await Promise.all(
    candidateResult.map(async (candidate) => {
      const otherData = await getCandidateWithDetailsById(candidate.id);
      return { ...candidate, ...otherData };
    }),
  );

  const skillsResult = await getSkills();
  const skills = [];
  for (let skill of skillsResult) {
    let object = { label: "", value: "", key: "skills" };
    object.label = skill.title;
    object.value = skill.id;
    object.key = "skills";
    skills.push(object);
  }
  skills.sort((a, b) => a.label.localeCompare(b.label));
  let locationsResult = totalCandidates.map((candidate) => candidate.location);
  //@ts-ignore
  let locationsData = [...new Set(locationsResult)];

  const locations = [];
  for (let location of locationsData) {
    let object = { label: "", value: "", key: "location" };
    object.label = location;
    object.value = location;
    object.key = "location";
    locations.push(object);
  }
  totalCandidates.sort((a, b) => a.firstName.localeCompare(b.firstName));
  locations.sort((a, b) => a.label.localeCompare(b.label));
  return {
    props: { totalCandidates, skills, locations },
  };
}

export default Recruiting;

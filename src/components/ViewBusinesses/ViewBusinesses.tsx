// @PACKAGES
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

// @COMPONENTS
import Search from "@components/Search";
import FilterBusiness from "@components/FilterBusinesses/FilterBusiness";
import { LoggedInLayout } from "@components/Layout";
//AMPLITUDE
import amplitude from "@config/amplitude";
// @SECTIONS
import SearchTab from "@sections/search/SearchTab";
// @UTILS
import { businessCategory } from "@utils/constants";
import { algoliaUtils } from "@utils/index";
import { BUSINESS_FILTERS_APPLIED } from "@utils/events";
// @CONTEXT
import DataContext from "@context/DataContext";
// @SERVICES
import { getBusinessWithFilter } from "@services/Business";

const ViewBusinesses = ({ businesses, type, categories }) => {
  const { loading, states, currentUser, businessWithDetails, currentUserWithDetails } = useContext(DataContext);
  const router = useRouter();
  const {
    query: { size: querySize },
  } = router;
  let sizePos = businessCategory
    .map(function (e) {
      return e.label.toLowerCase();
    })
    .indexOf(!Array.isArray(querySize) ? querySize : querySize.join(" "));
  sizePos = sizePos === -1 ? 0 : sizePos;
  const handleLogEvent = (data) => {
    const { id, firstName, lastName, email } = currentUserWithDetails;
    amplitude.logEvent(BUSINESS_FILTERS_APPLIED, {
      filterData: data,
      user: {
        id: id,
        name: `${firstName} ${lastName}`,
        email: email[0].email,
        business: { name: businessWithDetails.name, id: businessWithDetails.id, type: businessWithDetails.type },
      },
      time: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    });
  };
  const [statesArray, setStates] = useState([]);
  const [blackBusinesses, setBlackBusinesses] = useState(businesses);
  const [category, setCategories] = useState(categories);
  const [businessSize, setSize] = useState(businessCategory[sizePos]?.value);
  // @TODO: Fix this
  const [state, setState] = useState(statesArray[0]?.value);
  const [isBusinessPage, setIsBusinessPage] = useState<boolean>(false);

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    const filteredBusinesses = await getBusinessWithFilter(category.value, businessSize, state, type);
    filteredBusinesses.sort((a, b) => a.name.localeCompare(b.name));
    setBlackBusinesses(filteredBusinesses);
    handleLogEvent({ filterCategory: category, filterBusinessSize: businessSize, filterBusinessState: state });
  };

  const getFilters = (filters) => {
    if (filters.type === "size") {
      setSize(filters.value);
    } else if (filters.type === "industry") {
      setCategories(filters);
    } else if (filters.type === "state") {
      setState(filters.value);
    }
  };

  const callBackFunction = (businesses) => {
    if (Array.isArray(businesses)) {
      const transformedBusinesses = algoliaUtils.scanBusinessesData(businesses);
      transformedBusinesses.sort((a, b) => a.name.localeCompare(b.name));
      setSize(businessCategory[0].value);
      setBlackBusinesses(transformedBusinesses);
    }
  };

  useEffect(() => {
    async function setStatesArray() {
      const statesOfCurrentBusinesses = blackBusinesses.map((data) => data.state);

      let result = [];
      states.forEach((data) => {
        if (statesOfCurrentBusinesses.includes(data.isoCode)) {
          result.push(data);
        }
      });
      const array = [{ value: "ALL", label: "All States", type: "state" }];
      for (let state of result) {
        let object = { label: "", value: "", type: "state" };
        object.label = state.name;
        object.value = state.isoCode;
        object.type = "state";
        array.push(object);
      }

      array.sort((a, b) => a.label.localeCompare(b.label));
      setStates(array);
    }
    if (states && blackBusinesses) {
      setStatesArray();
    }
  }, [states]);

  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/");
    }
  }, [loading]);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.includes("business")) setIsBusinessPage(true);
  }, []);

  return (
    <LoggedInLayout contactModal={false}>
      <div className="row justify-content-center bg-default-1 pb-19 pt-0 mt-0">
        <div className="col col-12">{isBusinessPage && <Search businesses={blackBusinesses} parentCallback={callBackFunction} />}</div>
      </div>
      <div className="bg-default-1 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
        <div className="container">
          <div className="row justify-content-center">
            {isBusinessPage && (
              <FilterBusiness
                handleApplyFilters={handleApplyFilters}
                getFilters={getFilters}
                numberOfBusinesses={blackBusinesses?.length || 0}
                statesArray={statesArray}
              />
            )}
          </div>
          <SearchTab businesses={blackBusinesses} businessType={type} />
        </div>
      </div>
    </LoggedInLayout>
  );
};

export default ViewBusinesses;

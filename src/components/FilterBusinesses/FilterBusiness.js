import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { businessCategory } from "@utils/constants";
import { Select } from "@components/Core";

import DataContext from "@context/DataContext";
import { Button } from "@components/Common";
const FilterBusiness = ({ getFilters, numberOfBusinesses, statesArray, handleApplyFilters }) => {
  const [categoriesArray, setCategory] = useState([]);
  const { categories } = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    async function setCategoryArray() {
      const categoryLabelList = [];
      const array = [{ value: ["All"], label: "All Industries", type: "industry" }];
      for (let category of categories) {
        let object = { label: "", value: [], type: "industry" };
        object.label = category.name;
        object.value.push(category.id);
        if (!categoryLabelList.includes(object.label.toLowerCase().trim())) {
          categoryLabelList.push(object.label.toLowerCase().trim());
          array.push(object);
        }
      }
      array.sort((a, b) => a.label.localeCompare(b.label));
      setCategory(array);
    }

    if (categories) {
      setCategoryArray();
    }
  }, [categories]);

  return (
    <>
      <div className="col-12 col-lg-10 col-xl-12">
        {router.query.q && router.query.q.length > 0 && (
          <h2 className="font-size-8 mb-6">
            You&apos;re searching &ldquo;
            {router.query.q.charAt(0).toUpperCase() + router.query.q.slice(1)}
            &ldquo;
          </h2>
        )}

        <form className="my-8">
          <div className="search-filter from-group d-flex align-items-center justify-content-center flex-wrap">
            <div className="mr-5 ">
              <Select
                className="font-size-4"
                options={categoriesArray}
                css={`
                  min-width: 250px;
                `}
                sendFilters={getFilters}
                placeholder={"Filter by industry"}
                defaultValue={"none"}
              />
            </div>
            <div className="mr-5 ">
              <Select
                options={businessCategory}
                className="font-size-4"
                css={`
                  min-width: 250px;
                `}
                sendFilters={getFilters}
                placeholder={"Filter by size"}
                defaultValue={"none"}
              />
            </div>
            <div className="mr-5 ">
              <Select
                options={statesArray}
                className="font-size-4"
                css={`
                  min-width: 250px;
                `}
                sendFilters={getFilters}
                defaultValue={"none"}
                placeholder={"Filter by state"}
              />
            </div>
            <div className="bg-green mt-auto mb-auto">
              <Button dark textUpperCase text="apply" medium handleClick={handleApplyFilters} />
            </div>
          </div>
        </form>
        <div className="d-flex align-items-center justify-content-between mb-6">
          <h5 className="font-size-4 font-weight-normal text-gray">
            Showing
            <span className="text-black-2 pl-1">{numberOfBusinesses}</span> matched businesses
          </h5>
        </div>
      </div>
    </>
  );
};

export default FilterBusiness;

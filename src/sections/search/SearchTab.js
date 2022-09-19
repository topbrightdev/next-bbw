import React from "react";
import BusinessCard from "../../components/BusinessCard/BusinessCard";
import _ from "lodash";
const SearchTab = (props) => {
  const { businesses, businessType } = props;
  return (
    <>
      <div className="row justify-content-center position-static">
        <div className="col-12 col-xxl-12 col-xl-12 col-lg-12">
          <div className="col-12 col-xxl-12 col-xl-12 col-lg-12">
            {businesses?.map((business, index) => (
              <BusinessCard
                key={index}
                id={business.id}
                name={business.name}
                category={_.upperCase(business.categoryId?.name || "")}
                logo={business?.mediaId?.source}
                city={business.city}
                state={business.state}
                subcategory={business.subcategory}
                businessType={businessType}
                isActive={business.isActive}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchTab;

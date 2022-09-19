import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import blackBusiness from "../../assets/image/l3/png/blackBusiness.png";
import partner from "../../assets/image/l3/png/partner.png";

const AccountTypeCard = ({ image, title, description, onClick, selected }) => {
  return (
    <div className="col-lg-6 mt-3">
      <div className={`card card-pointer h-100 ${selected ? "border-selected bg-light" : null}`} onClick={onClick}>
        <div className="row">
          <div className="col-3 col-md-12">
            <img className="card-image-top ml-4 mx-md-auto mt-md-10 mt-4 d-block" src={image} />
          </div>
          <div className="col-9 col-md-12">
            <div className="card-body px-4 px-md-0">
              <h6 className="card-title text-md-center text-capitalize w-100">{title}</h6>
              <p className="card-text px-md-6 font-size-2 text-black-2 font-weight-semibold line-height-1p6">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleAccountSelect = ({ accountType, setAccount, setStepNumber }) => {
  const setAccountType = (account) => {
    setAccount(account);
  };
  const handleNextStep = () => {
    setStepNumber();
  };

  return (
    <React.Fragment>
      <div className="border-top-dashed">
        <p className="font-size-4 text-black-2 font-weight-bold mt-5">What account would you like to open?</p>
      </div>
      <div className="row d-flex flex-wrap">
        <AccountTypeCard
          title="BLACK BUSINESS"
          description="Black business owners seeking contracting opportunities"
          image={blackBusiness}
          selected={accountType === "business"}
          onClick={() => setAccountType("business")}
        />
        <AccountTypeCard
          title="PARTNER"
          description="Enterprise corporation looking to increase their spend with Black owned businesses"
          image={partner}
          selected={accountType === "partner"}
          onClick={() => setAccountType("partner")}
        />
      </div>
      <div className="mb-6 mt-8">
        <button
          className="btn btn-primary btn-medium w-100 rounded-5 font-size-3"
          disabled={accountType ? "" : "disabled"}
          onClick={handleNextStep}
        >
          Next &nbsp; <AiOutlineArrowRight color={"white"} />
        </button>
      </div>
    </React.Fragment>
  );
};

export default ScheduleAccountSelect;

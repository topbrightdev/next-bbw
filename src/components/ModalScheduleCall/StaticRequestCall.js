import { BiCheckCircle } from "react-icons/bi";
const StaticRequestCall = ({ accountType }) => {
  return (
    <div className="d-none d-md-block col-lg-5 col-md-6">
      <div className="pt-10 pb-6 pl-11 pr-12 bg-dark-gray h-100 d-flex flex-column dark-mode-texts">
        <div className="pb-9">
          <h3 className="font-size-6 text-white line-height-reset pb-4 line-height-1p4">Request a call</h3>
          <p className="mb-0 font-size-3 text-white">Meet our team to learn how we can help you business grow our business can grow</p>
        </div>
        <div className="d-flex justify-content-start align-items-center mt-5">
          <div>
            <BiCheckCircle size={25} color={"white"} />
          </div>
          <div>
            <p className="ml-2 mb-0 font-size-2 text-white mt-5 line-height-1p6">
              Black owned businesses with world-class capability and capacity
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center mt-9">
          <div>
            <BiCheckCircle size={25} color={"white"} />
          </div>
          <div>
            <p className="ml-2 mb-0 font-size-2 text-white line-height-1p6">
              Growing Black owned businesses with the capability and capacity to complete jobs and projects
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center mt-9">
          <div>
            <BiCheckCircle size={25} color={"white"} />
          </div>
          <div>
            <p className="ml-2 mb-0 font-size-2 text-white line-height-1p6">
              Black owned businesses with world-class capability and capacity
            </p>
          </div>
        </div>
        <div className="border-top border-default-color-2 mt-25">
          <div className="d-flex mx-n10 pt-6 mt-15 flex-xs-row flex-column border-top border-1 border-secondary">
            <div className="pt-5 px-9">
              <h3 className="font-size-7 text-white"> {accountType != null ? (accountType == "business" ? "$100M" : "46") : "295"} </h3>
              <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                {accountType != null
                  ? accountType == "business"
                    ? "In contract opportunities"
                    : "Premier Black Owned Businesses"
                  : "New jobs posted today"}
              </p>
            </div>
            <div className="pt-5 px-9">
              <h3 className="font-size-7 text-white">{accountType != null ? (accountType == "business" ? "5" : "$375M") : "14"}</h3>
              <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                {accountType != null
                  ? accountType == "business"
                    ? "Fortune 100 companies"
                    : "In business revenue"
                  : "New companies registered"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticRequestCall;

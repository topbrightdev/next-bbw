import React from "react";

const Hero = ({ businesses }) => {
  return (
    <>
      {businesses ? (
        ""
      ) : (
        <>
          {/* <!-- Hero Area --> */}
          <div className="pt-26 pt-md-32 pt-lg-33 pt-xl-35 position-relative z-index-1">
            {/* <!-- .Hero pattern --> */}
            <div className="pos-abs-tr w-50 z-index-n2">{/* <img src={imgP} alt="" className="gr-opacity-1" /> */}</div>
            {/* <!-- ./Hero pattern --> */}
            <div className="container">
              <div className="row position-relative align-items-center">
                <div
                  className="col-xxl-8 col-xl-9 col-lg-10 col-md-12 pt-lg-13 pb-lg-36 pb-xl-38 pb-md-35 pb-12"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                >
                  <h1 className="font-size-11 mb-3 pr-md-30 pr-lg-0">
                    {businesses ? "Lorem Ipsum" : "  Building capacity and facilitating transactions."}
                  </h1>
                  <p className="heading-default-color font-size-6 pt-7">
                    This is a place for Black-owned businesses to get their products and services in front of major enterprises and
                    organizations.
                  </p>
                  <div className="">
                    {/* <!-- .search-form --> */}
                    {/* <form action="/" className="search-form shadow-6"> */}
                    {/* <div className="filter-search-form-1 bg-white rounded-sm shadow-4"> */}
                    {/* <div className="filter-inputs"> */}
                    {/* <div className="form-group position-relative">
                        <input
                          className="form-control focus-reset pl-13"
                          type="text"
                          id="keyword"
                          placeholder="Job title"
                        />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                        </span>
                      </div> */}
                    {/* <!-- .select-city starts --> */}
                    {/* <div className="form-group position-relative">
                        <Select
                          options={defaultCountries}
                          className="pl-8 h-100 arrow-3 font-size-4 d-flex align-items-center w-100"
                          border={false}
                        />

                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                        </span>
                      </div> */}
                    {/* <!-- ./select-city ends --> */}
                    {/* </div> */}
                    {/* <!-- .Hero Button --> */}
                    <div className="button-block">
                      {/* <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
                        Search
                      </button> */}
                    </div>
                    {/* <!-- ./Hero Button --> */}
                    {/* </div> */}
                    {/* </form> */}
                    {/* <!-- ./search-form --> */}
                    {/* <p className="heading-default-color font-size-3 pt-7">
                  <span className="text-smoke">Search keywords e.g.</span>{" "}
                  Product Designer
                </p> */}
                  </div>
                </div>
                {/* <!-- Hero Right Image --> */}
                <div
                  className="col-lg-6 col-md-4 col-sm-6 col-xs-6 col-8 pos-abs-br z-index-n1 position-static position-md-absolute mx-auto ml-md-auto"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                >
                  {/* <div className=" ml-xxl-23 ml-xl-12 ml-md-7">
                <img src={imgH} alt="" className="w-100" />
              </div> */}
                </div>
                {/* <!-- ./Hero Right Image --> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Hero;

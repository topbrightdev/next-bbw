import React from "react";
import Search from "../../components/Search";
import imgL1Logo from "../../assets/image/black-logo-horizontal.svg";

const Hero = () => {
  return (
    <>
      {/* <!-- Hero Area --> */}
      <div className="position-relative z-index-1 mt-5 mt-md-5 mt-lg-0 mt-xl-5">
        <div className="container">
          <div className="row position-relative align-items-center">
            <div
              className="col-xxl-12 col-xl-12 col-lg-12 pt-lg-26 pb-lg-26 pt-md-20"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-dealy="750"
            >
              <div className="row">
                <div className="col-l-12 col-md-12 col-sm-12 d-flex flex-column mt-15 mt-md-1">
                  <img className="mb-5" src={imgL1Logo} alt="black-business-warehouse" height="150vh" width="auto" />
                  <p className="font-size-6 align-self-center text-center">
                    Search & discover high quality Black-owned businesses in the State of Washington.
                  </p>
                </div>
              </div>

              <Search businesses />
              <p className="heading-default-color font-size-3 pt-7">
                <span className="text-smoke">Search keywords e.g.</span> Construction
              </p>
            </div>

            {/* <div className="col-12 pos-abs-tr z-index-n1 position-static position-lg-absolute ml-auto hero-image-positioning-2">
              <div className="image-group row justify-content-center">
                <div className="col-sm-8 col-12 mt-10 mt-lg-1">
                  <div
                    className="single-image"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-dealy="750"
                  >
                    <img src={imgC2} alt="Black Business Warehouse" style={{height:"80vh"}} />
                  </div>
                </div>
                <div className="col-sm-6 col-10 mt-10 mt-lg-0">
                  <div
                    className="single-image"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-dealy="1200"
                  >
                    <img src={imgC2} alt="hero 2" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

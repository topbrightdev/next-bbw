import React from "react";

const Brands = ({ businesses }) => {
  return (
    <>
      {businesses ? (
        ""
      ) : (
        <>
          {/* <!-- Brands Area --> */}
          <div className="bg-black-2 dark-mode-texts pt-3 pt-lg-12 pb-5 pb-lg-12">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title mb-9 text-center text-lg-left">
                    <h5 className="font-size-5 font-weight-normal">
                      {businesses
                        ? "Partner with some of the top Black-owned businesses in the country"
                        : "Partner with some of the top enterprises and organizations"}
                    </h5>
                  </div>
                </div>
              </div>
              {/* <!-- Brand Logos --> */}
              <div className="row align-items-center justify-content-left">
                {/* <!-- Single Brand --> */}
                <div className="single-brand-logo mx-5 my-6" data-aos="fade-in" data-aos-duration="800">
                  <img
                    src={
                      businesses
                        ? ""
                        : "https://wireless.mckinstry.com/wp-content/themes/chade-child-theme/img/McKinstry-logo-white01.png"
                    }
                    alt="Black business warehouse"
                    height="75px"
                  />
                </div>
                {/* <!-- Single Brand --> */}
                <div className="single-brand-logo mx-5 my-6" data-aos="fade-in" data-aos-duration="800" data-aos-delay="300">
                  <img
                    src={businesses ? "" : "https://foster.uw.edu/wp-content/uploads/2015/06/foster-logo-uw-white.png"}
                    alt="Black business warehouse"
                    height="75px"
                  />
                </div>
              </div>
              {/* <!-- End Brand Logos --> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Brands;

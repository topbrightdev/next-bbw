import React from "react";

const Services = ({ businesses }) => {
  return (
    <>
      {businesses ? (
        ""
      ) : (
        <>
          {" "}
          {/* <!-- Services Area --> */}
          <div className="bg-dark dark-mode-texts pt-11 pt-lg-20 pb-7 pb-lg-18">
            <div className="container">
              {/* <!-- Section title --> */}
              <div className="row justify-content-left">
                <div className="col-12 col-md-8 col-lg-6 col-xxl-5">
                  <div className="text-left mb-8 mb-lg-14 px-xl-9 px-xxl-7">
                    <p className="font-size-4 text-white px-xs-9 px-md-0">
                      {businesses ? "Lorem Ipsum" : "Get a foot in the door with us and we'll do the rest."}
                    </p>
                    <h1 className="font-size-10 mb-4">{businesses ? "Lorem Ipsum" : " Grow Your Business"}</h1>
                  </div>
                </div>
              </div>
              {/* <!-- End Section title --> */}
              {/* <!-- Services Content --> */}
              <div className="column justify-content-left align-items-left" data-aos="fade-up" data-aos-duration="1000">
                {/* <!-- Single Services --> */}
                <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" data-aos="fade-up" data-aos-duration="1000">
                  <div className="px-xl-7 px-xxl-12 pt-5 pb-3 pb-lg-9 text-left">
                    <div className="services-content">
                      <h3 className="font-size-7 mb-7"> {businesses ? "Lorem Ipsum" : " We Grow Your Business"}</h3>
                      <p className="font-size-4 text-white">
                        {businesses
                          ? `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.`
                          : `                  The Black Business Warehouse is the place to come and find opportunities to sell your products and services to major enterprises. You can search for opportunities, learn how to do business with major enterprises, and more. You can also
reach out directly to your on-demand Business Liaison from the Black Business Warehouse to help you navigate the
process of growing your business through new sales opportunities and connections.`}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- End Single Services --> */}
                {/* <!-- Single Services --> */}
                <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" data-aos="fade-up" data-aos-duration="1000">
                  {" "}
                  <div className="px-xl-7 px-xxl-12 pt-5 pb-3 pb-lg-9 text-left">
                    <div className="services-content">
                      <h3 className="font-size-7 mb-7">
                        {" "}
                        {businesses ? "Lorem Ipsum" : "Learn How To Do Business with Major Enterprises"}
                      </h3>
                      <p className="font-size-4 text-white">
                        {businesses
                          ? `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.`
                          : `The Black Business Warehouse is the place to come and find opportunities to sell your products and services to major enterprises. You can search for opportunities, learn how to do business with major enterprises, search for opportunities to bid on, and more.`}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- End Single Services --> */}
                {/* <!-- Single Services --> */}
                <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" data-aos="fade-up" data-aos-duration="1000">
                  {" "}
                  <div className="px-xl-7 px-xxl-12 pt-5 pb-3 pb-lg-9 text-left">
                    <div className="services-content">
                      <h3 className="font-size-7 mb-7"> {businesses ? "Lorem Ipsum" : `Submit Bids for Contracts`}</h3>
                      <p className="font-size-4 text-white">
                        {businesses
                          ? `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
`
                          : ` Black Business Warehouse provides you with first access to business deals from major enterprises worth billions in savings and contracts spanning construction, education, financials, technology, and other markets across the U.S. : Build your reputation as a supplier and secure connections with established businesses that boost profitability.                 
`}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- End Single Services --> */}
              </div>
              {/* <!-- End Services Content --> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Services;

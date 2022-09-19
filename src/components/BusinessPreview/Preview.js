import React from "react";
import Link from "next/link";
import { cleanImage } from "../../utils";
import iconL2 from "../../assets/image/svg/icon-location.svg";
import iconD from "../../assets/image/icon-website.svg";
import iconB from "../../assets/image/svg/icon-industry.svg";
// TODO: Fix preview to scroll with user scroll

const PreviewCard = (props) => {
  const {
    logo,
    name,
    industry,
    services,
    // location,
    // city,
    // state,
    id,
    address,
    owner,
    certifications,
    description,
    founded,
    website,
  } = props;
  return (
    <div className="bg-white rounded-4 border border-mercury shadow-8 pos-abs-xl ml-xl-8 overflow-y-scroll mt-9 mt-xl-0 w-100">
      {/* <!-- Single Featured Job --> */}
      <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
        <div className="row">
          <div className="col-12">
            {/* <!-- media start --> */}
            <div className="media align-items-center">
              {/* <!-- media logo start --> */}
              <div className="d-block mr-8">
                <img src={cleanImage(logo)} alt="black business warehouse" width="75px" height="100%" />
              </div>
              {/* <!-- media logo end --> */}
              {/* <!-- media texts start --> */}
              <div>
                <h3 className="font-size-6 mb-0">{name}</h3>
                <span className="font-size-3 text-gray line-height-2">{industry}</span>
              </div>
              {/* <!-- media texts end --> */}
            </div>
            {/* <!-- media end --> */}
          </div>
        </div>
        <div className="row pt-9">
          <div className="col-12">
            {/* <!-- card-btn-group start --> */}
            <div className="card-btn-group">
              <Link href={{ pathname: "/contact", query: { companies: id } }}>
                <a className="btn btn-dark-gray text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">Contact Now</a>
              </Link>
              <a
                className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-7"
                href={`${website}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="image mr-5">
                  <img src={iconD} alt="" />
                </div>{" "}
                Website
              </a>
            </div>
            {/* <!-- card-btn-group end --> */}
          </div>
        </div>
      </div>
      {/* <!-- End Single Featured Job --> */}
      <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="media justify-content-md-start mb-6">
              <div className="image mr-5">
                <img src={iconL2} alt="" />
              </div>
              <p className="font-size-5 text-gray mb-0">{address}</p>
            </div>
          </div>
          {/* <div className="col-md-6">
              <div className="media justify-content-md-start mb-6">
                <div className="image mr-5">
                  <img src={iconD} alt="" />
                </div>
                <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                  80-90K PLN PLN
                </p>
              </div>
            </div> */}
          <div className="col-md-8 mb-5">
            <div className="media justify-content-md-start mb-md-0 mb-6">
              <div className="image mr-5">
                <img src={iconB} alt="" />
              </div>
              <p className="font-weight-semibold font-size-5 text-black-2 mb-0">{industry} </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* <div className="mb-lg-0 mb-10">
              <span className="font-size-4 d-block mb-4 text-gray">
                Type of corporation
              </span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                B2B &amp; B2C
              </h6>
            </div> */}
            <div className="tags">
              <p className="font-size-4 text-gray mb-3">Services</p>
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="bg-dark-gray min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-white mt-2 d-inline-block">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-6 mb-lg-0 mb-8">
            <div className="">
              <span className="font-size-4 d-block mb-4 text-gray">President</span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">{owner} </h6>
            </div>
            {certifications[0].length > 1 && (
              <div className="tags mb-10">
                <p className="font-size-4 text-gray mb-0">Certifications</p>
                <ul className="list-unstyled mr-n3 mb-0">
                  {certifications.map(
                    (cert, index) =>
                      cert.length > 1 && (
                        <li className="d-block font-size-4 text-black-2 mt-2" key={index}>
                          <span className="d-inline-block mr-2">•</span>
                          {cert}
                        </li>
                      ),
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div className="">
              <span className="font-size-4 d-block mb-4 text-gray">Year Started</span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">{founded}</h6>
            </div>
          </div>
          {/* <div className="col-md-6">
            <div className="">
              <span className="font-size-4 d-block mb-4 text-gray">
                Year Started
              </span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                {founded}
              </h6>
            </div>
          </div> */}
        </div>
      </div>
      <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
        <div className="row">
          <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
            <div className="">
              <p className="mb-4 font-size-4 text-gray">About the business</p>
              <p className="font-size-4 text-black-2 mb-7">{description}</p>
            </div>
            {/* <div className="">
              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                Your Role:
              </span>
              <p className="font-size-4 text-black-2 mb-7">
                We’re looking for a passionate individual to design beautiful
                and functional products for our customers at Gubagoo. We move
                very fast and you will be expected to contribute to a
                cross-functional product development squad, that includes
                product managers and developers, to deliver the UX and UI for
                the team to bring to life.
              </p>
              <p className="font-size-4 text-black-2 mb-7">
                We are serious about remote work. You can work for from
                anywhere.
              </p>
              <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                What you will be doing:
              </span>
              <ul className="list-unstyled">
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                  <span className="d-inline-block mr-7">•</span>
                  Contribute new controls or design improvements to our
                </li>
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                  <span className="d-inline-block mr-7">•</span>
                  Take ownership of the successful delivery of features
                </li>
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                  <span className="d-inline-block mr-7">•</span>
                  Help set and achieve quarterly goals
                </li>
                <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                  <span className="d-inline-block mr-7">•</span>
                  Ship a TON of product improvements and features
                </li>
              </ul> */}

            {/* </div> */}
            <Link href={{ pathname: "/contact", query: { companies: id } }}>
              <a className="btn btn-dark-gray text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6">Contact Now</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;

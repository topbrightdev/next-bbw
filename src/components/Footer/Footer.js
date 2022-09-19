import React from "react";
import imgM from "../../assets/image/black-logo.svg";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container pt-8 pt-lg-8 pb-8 pb-lg-2">
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-lg-0 mb-5">
              {/* <!-- footer logo start --> */}
              {/* <Logo white className="footer-logo mb-14" /> */}
              {/* <!-- footer logo End --> */}
              {/* <!-- media start --> */}
              <div className="media mb-5">
                <img src={imgM} className="align-self-center mr-3" alt="black business warehouse" height="25px" />
                <div className="media-body pl-5">
                  <p className="mb-0 font-size-4 text-dark-gray">Contact us at</p>
                  <a className="mb-0 font-size-4 font-weight-bold" href="mailto:support@blackbusinesswarehouse.com">
                    support@blackbusinesswarehouse.com{" "}
                  </a>
                </div>
              </div>
              {/* <!-- media start --> */}
              {/* <!-- widget social icon start --> */}
              <div className="social-icons">
                <ul className="pl-0 list-unstyled d-flex align-items-end ">
                  <li className="d-flex flex-column justify-content-center px-3 mr-3 font-size-4 heading-default-color">
                    Follow us on:
                  </li>
                  <li className="d-flex flex-column justify-content-center px-3 mr-3">
                    <a
                      className="hover-color-primary heading-default-color"
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f font-size-3 pt-2"></i>
                    </a>
                  </li>
                  <li className="d-flex flex-column justify-content-center px-3 mr-3">
                    <a
                      className="hover-color-primary heading-default-color"
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter font-size-3 pt-2"></i>
                    </a>
                  </li>
                  <li className="d-flex flex-column justify-content-center px-3 mr-3">
                    <a
                      className="hover-color-primary heading-default-color"
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in font-size-3 pt-2"></i>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- widget social icon end --> */}
            </div>
            <div className="col-lg-8 col-md-6">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                  <div className="footer-widget widget2 mb-md-0 mb-13">
                    {/* <!-- footer widget title start --> */}
                    {/* <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                      Company
                    </p> */}
                    {/* <!-- footer widget title end --> */}
                    {/* <!-- widget social menu start --> */}
                    {/* <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            About us
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Contact us
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Careers
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Press
                          </a>
                        </Link>
                      </li>
                    </ul> */}
                    {/* <!-- widget social menu end --> */}
                    {/* </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                  <div className="footer-widget widget3 mb-sm-0 mb-13"> */}
                    {/* <!-- footer widget title start --> */}
                    {/* <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                      Product
                    </p> */}
                    {/* <!-- footer widget title end --> */}
                    {/* <!-- widget social menu start --> */}
                    {/* <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Features
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Pricing
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            News
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Help desk
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Support
                          </a>
                        </Link>
                      </li>
                    </ul> */}
                    {/* <!-- widget social menu end --> */}
                    {/* </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                  <div className="footer-widget widget4 mb-sm-0 mb-13"> */}
                    {/* <!-- footer widget title start --> */}
                    {/* <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                      Services
                    </p> */}
                    {/* <!-- footer widget title end --> */}
                    {/* <!-- widget social menu start --> */}
                    {/* <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Digital Marketing
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            SEO for Business
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Avasta Dash
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            UI Design
                          </a>
                        </Link>
                      </li>
                    </ul> */}
                    {/* <!-- widget social menu end --> */}
                    {/* </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                  <div className="footer-widget widget4"> */}
                    {/* <!-- footer widget title start --> */}
                    {/* <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                      Legal
                    </p> */}
                    {/* <!-- footer widget title end --> */}
                    {/* <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Privacy Policy
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Terms &amp; Conditions
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/#">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Return Policy
                          </a>
                        </Link>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

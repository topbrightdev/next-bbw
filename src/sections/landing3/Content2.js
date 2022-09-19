import React, { useContext } from "react";
import { useRouter } from "next/router";
import imgC1 from "../../assets/image/connecting-partner.svg";
import GlobalContext from "../../context/GlobalContext";
import { auth } from "../../config/firebase";

const Content = ({ businesses }) => {
  const { toggleSignInModal } = useContext(GlobalContext);
  const router = useRouter();

  const handleFindPartners = (_) => {
    if (!auth.currentUser) toggleSignInModal();
    else router.push(businesses ? "/businesses?size=small" : "/partners");
  };

  return (
    <>
      {/* <!-- Content Area -->  */}
      <section className="pb-lg-24 pb-13">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-xxl-5 col-xl-6 col-lg-6 col-md-8 col-sm-10 order-2 order-lg-1 "
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <div className="position-relative d-flex flex-column justify-content-center h-100 pr-xl-8 pr-0 mt-5 mt-lg-0">
                {/* <!-- content-2 section title start --> */}
                <h1 className="font-size-10 mb-7 pr-xs-13  pr-md-0 pr-sm-8">
                  {businesses ? "Small Businesses" : " Connecting Partners"}
                </h1>
                <p className="text-default-color font-size-6 mb-4 mb-lg-5 pr-xxl-13 pr-lg-0 pr-md-10">
                  {businesses
                    ? `Growing Black owned businesses with the capability and capacity to complete jobs and projects.`
                    : ` Business groups, trade organizations, and Community resource
                organizations. They bring resources, training, convening, and
                advocacy services. These organizations promote Black business
                development to its members or its network. They also bring
                either major business enterprises or Black businesses to the
                network.`}

                  {/* Leverage our Connecting Partners to build capabilities and expand your business's opportunities for mentorship (advisory) and sponsorship (advocacy). */}
                </p>
                <div className="btns d-flex justify-content-xl-start justify-content  flex-wrap h-100 mx-n4">
                  <a className="btn btn-dark-gray btn-xl mx-4 mt-6 text-uppercase" onClick={handleFindPartners}>
                    {businesses ? "Find a Small Business" : " Find Partners"}
                  </a>
                </div>
                {/* <!-- content-2 section title end --> */}
                {/* <!-- content-2 btn start --> */}
                {/* <Link href="/#">
                  <a className="text-green font-weight-bold text-uppercase font-size-3">
                    Learn More <i className="fas fa-arrow-right ml-3"></i>
                  </a>
                </Link> */}
                {/* <!-- content-2 btn end --> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-8 order-1 order-lg-2 " data-aos="fade-left" data-aos-duration="800">
              {/* <!-- content-2 start --> */}
              <div className="pl-lg-10 pl-0">
                {/* <!-- content img start --> */}
                <div className="d-xs-flex  mx-sm-n3">
                  <div className="d-flex flex-column px-3 px-sm-6 w-lg-auto w-100">
                    {/* <!-- single image start --> */}
                    <img
                      src={
                        businesses
                          ? `https://images.nappy.co/uploads/large/women-in-tech-67-28031608722937ieyuhozbkjssxmxotnarcxfevwgirbffuir9vv7urus2mttffcoplq4v3sxvsykg6zkqy0t6535p8wvcyzimyrkckmth5fnplwx2.jpg?auto=format&fm=jpg&w=1280&q=75`
                          : imgC1
                      }
                      alt=""
                      data-aos="zoom-in"
                      data-aos-duration="300"
                      className="w-100 pb-6 pb-sm-9 rounded-4 "
                    />
                    {/* <!-- single image end --> */}
                    {/* <!-- single image --> */}
                    {/* <img
                      src={imgC2}
                      alt=""
                      data-aos="zoom-in"
                      data-aos-duration="500"
                      data-aos-delay="700"
                      className="w-100 pb-6 pb-sm-9 rounded-4 "
                    /> */}
                    {/* <!-- single image end --> */}
                  </div>
                  {/* <div className="d-flex flex-column pt-xs-11 px-3 px-sm-6 w-lg-auto w-100"> */}
                  {/* <!-- single image --> */}
                  {/* <img
                      src={imgC3}
                      alt=""
                      data-aos="zoom-in"
                      data-aos-duration="500"
                      data-aos-delay="400"
                      className="w-100 pb-6 pb-sm-9 rounded-4 "
                    /> */}
                  {/* <!-- single image end --> */}
                  {/* <!-- single image --> */}
                  {/* <div className="bg-green py-16 px-19 rounded-4"></div> */}
                  {/* <!-- single image end --> */}
                  {/* </div> */}
                </div>
                {/* <!-- abs-content end --> */}
              </div>
              {/* <!-- content-2 end --> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;

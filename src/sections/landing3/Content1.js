import React, { useContext } from "react";
import imgC1 from "../../assets/image/discover-image.svg";
import GlobalContext from "../../context/GlobalContext";
import { auth } from "../../config/firebase";
import { useRouter } from "next/router";

const Content = ({ businesses }) => {
  const { toggleSignInModal } = useContext(GlobalContext);
  const router = useRouter();

  const handleFindPartners = (_) => {
    if (!auth.currentUser) toggleSignInModal();
    else router.push(businesses ? "/businesses?size=enterprise" : "/partners");
  };

  return (
    <>
      {/* <!-- Content Area -->  */}
      <section className="pt-13 pt-lg-30 pb-lg-30">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-8 col-xs-10" data-aos="fade-right" data-aos-duration="800">
              <div className="d-flex flex-column px-3 px-sm-6 w-lg-auto w-100">
                {/* <!-- content img start --> */}
                <img
                  src={
                    businesses
                      ? `https://images.nappy.co/uploads/large/280316088044345sprodltjjedmw4w6cnrrmquj0cltjsgl0yoaif2ug7nzf0cr3j6fjt46jbrytmk6chjq3zby3ulb0ipmzeuxmqhpzolfq83tglu.jpg?auto=format&fm=jpg&w=1280&q=75`
                      : imgC1
                  }
                  alt="black business warehouse"
                  data-aos="zoom-in"
                  data-aos-duration="300"
                  className="w-100 pb-6 pb-sm-9 rounded-4 "
                />
                {/* <!-- content img end --> */}
                {/* <!-- abs-content start --> */}
                {/* <div className="abs-content pos-abs-br mb-30 mr-8 rounded-4 rotate-n10 border-10 border-white shadow-2"> */}
                {/* <img
                    src={"https://upload.wikimedia.org/wikipedia/en/1/1c/Foster_School_of_Business_logo.png"}
                    alt=""
                    height="75px"
                    className="rounded-4 border-white border-width-3"
                  /> */}
                {/* </div> */}
                {/* <!-- abs-content end --> */}
              </div>
            </div>
            <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-8 col-sm-11" data-aos="fade-left" data-aos-duration="800">
              {/* <!-- content-2 start --> */}
              <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                {/* <!-- content section title start --> */}
                <h1 className="font-size-10 mb-7 pr-xs-13  pr-md-0 pr-sm-8">
                  {businesses ? "Enterprise Businesses" : "Trading Partners"}
                </h1>
                <p className="text-default-color font-size-6 mb-4 mb-lg-5 pr-xxl-13 pr-lg-0 pr-md-10">
                  {businesses
                    ? `Black owned businesses with world-class capability and capacity.`
                    : `Major business enterprises desirous of growing their market share by buying
products and services from Black businesses. They are looking to build deeper relationships and true
business partnership. These corporations are building competitive economic environment, and creating
a virtuous business cycles.`}

                  {/* Complete transactions with the most respected companies in America. We have an extensive network of major business enterprises with a desire to grow their market share by buying products and services from Black businesses.                */}
                </p>
                <div className="btns d-flex justify-content-xl-start justify-content-center align-items-xl-center flex-wrap h-100  mx-n4">
                  <a onClick={handleFindPartners} className="btn btn-dark-gray btn-xl mx-4 mt-6 text-uppercase">
                    {businesses ? "Find an Enterprise" : " Find Partners"}
                  </a>
                </div>
                {/* <!-- content section title end --> */}
                {/* <!-- content-2 btn start --> */}
                {/* <Link href="/#">
                  <a className="text-green font-weight-bold text-uppercase font-size-3">
                    Learn More <i className="fas fa-arrow-right ml-3"></i>
                  </a>
                </Link> */}
                {/* <!-- content-2 btn end --> */}
                {/* <!-- media start --> */}
                <div className="media mb-9 mt-9 mt-lg-15 pr-sm-10 pr-md-18 pr-xl-20">
                  {/* <!-- media img start --> */}
                  {/* <div className="media-img">
                    <img src={imgM} alt="" className="circle-48" />
                  </div> */}
                  {/* <!-- media img start --> */}
                  {/* <!-- media body start --> */}
                  {/* <div className="media-body pl-7">
                    <p className="mb-0 font-size-4 heading-default-color mb-7">
                      “Duis pretium gravida enim, vel maximus ligula fermentum
                      a. Sed rhoncus eget ex id egestas. Nam nec nisl placerat,
                      tempus erat a, condimentum metus.”
                    </p>
                    <h6 className="mb-0 font-size-4">Davis Jones</h6>
                    <p className="font-size-3 text-default-color">
                      Full-Stack Developer
                    </p>
                  </div> */}
                  {/* <!-- media body start --> */}
                </div>
                {/* <!-- media end --> */}
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

import React from "react";
import PageWrapper from "../../components/PageWrapper";
import PartnerCard from "../../components/PartnerCard/PartnerCard";
import { db } from "../../config/firebase.js";

const SearchGrid = ({ partners }) => {
  return (
    <>
      <PageWrapper>
        <div className="bg-default-1 pt-26 pt-lg-28 pb-13 pb-lg-25">
          <div className="container">
            <div className="row">
              {/* <div className="col-12 col-md-4 col-xs-8">
                <Sidebar />
              </div> */}
              <div className="col-12 col-md-8 col-xs-12 ">
                {/* <!-- form --> */}
                {/* <Search partners /> */}
                <div className="pt-12 ml-lg-0 ml-md-15">
                  {/* <div className="d-flex align-items-center justify-content-between">
                    {router.query.q && router.query.q.length > 0 && (
                      <h5 className="font-size-4 font-weight-normal text-default-color">
                        <span className="heading-default-color pr-1">{PARTNERS.partners.length}</span>
                        {PARTNERS.partners.length > 1 ? "results" : "result"} for{' '}
                        <span className="heading-default-color">
                          "
                          {router.query.q.charAt(0).toUpperCase() +
                            router.query.q.slice(1)}
                          "
                        </span>
                      </h5>
                    )}
                  </div> */}
                  <div className="pt-6">
                    <div className="row">
                      {partners.map((partner, index) => (
                        <PartnerCard key={index} {...partner} />
                      ))}
                    </div>
                  </div>
                  {/* <div className="text-center pt-5 pt-lg-13">
                    <Link href="/#">
                      <a className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center">
                        Load More{' '}
                        <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                      </a>
                    </Link>
                  </div> */}
                </div>
                {/* <!-- form end --> */}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export async function getServerSideProps(_context) {
  const partners = await db
    .collection("partners")
    .orderBy("business_name")
    .get()
    .then((res) => {
      return res.docs.map((entry) => entry.data());
    })
    .catch((err) => console.error("ERROR", err));

  return {
    props: { partners }, // will be passed to the page component as props
  };
}

export default SearchGrid;

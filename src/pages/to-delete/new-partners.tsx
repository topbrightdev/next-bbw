import { useContext } from "react";
import { NextPage } from "next";
import { PageWrapperContent } from "@components/Layout";
import Button from "@components/Common/Button";
import { statsService } from "@services/index";
import GlobalContext from "@context/GlobalContext";
const partnersCompetitive = require("@image/partners-competitive.png");
const constantlyGrowing = require("@image/constantly-growing-partner.png");
const warmIntroduction = require("@image/warm-introduction.svg");
const businessCommunity = require("@image/business-community.svg");
const dueDiligence = require("@image/due-diligence.png");
const diligenceLogos = require("@image/diligence-logos.svg");
const line = require("@image/line.svg");
const consultation = require("@image/consultation.png");
const opportunity = require("@image/opportunity.png");
const proposals = require("@image/proposals.png");
const hire = require("@image/hire.png");
const rocket = require("@image/svg/rocket.svg");
const partner_statistics = require("@image/svg/partners_statistics.svg");
const changeWorld = require("@image/l3/png/change-world.png");
const accountManager = require("@image/svg/account-manager.svg");
const programSuccessManager = require("@image/svg/program-success-manager.svg");
const companyAmbassador = require("@image/svg/company-ambassador.svg");
interface OurPartnersPageProps {
  businessStats: {
    partnersCount: number;
    opportunityCount: number;
    contractsAwarded: number;
  };
}
const OurPartnersPage: NextPage<OurPartnersPageProps> = (props) => {
  const { toggleScheduleCall } = useContext(GlobalContext);
  const { businessStats } = props;
  return (
    <div>
      <PageWrapperContent>
        <div className=" mb-20">
          <section className="row d-flex align-items-center pb-20 ml-32">
            <div className="col col-6 " data-aos="fade-right" data-aos-duration="800">
              <h1 style={{ fontSize: 62, lineHeight: 1.35 }}>
                <strong>
                  Get Tomorrow&apos;s Competitive <br></br> Edge Today
                </strong>
              </h1>
              <div className="mt-16">
                {/* @ts-ignore */}
                <Button dark medium textUpperCase handleClick={toggleScheduleCall} text="Schedule a Call" />
              </div>
            </div>
            <div className="col col-6 pl-32 p-0 m-0" data-aos="fade-left" data-aos-duration="800">
              <img className="w-100" alt="Grow your business" src={partnersCompetitive} />
            </div>
          </section>

          <section className="row d-flex align-items-center bg-black-2">
            <div className="col col-4 px-0" data-aos="fade-right" data-aos-duration="800">
              <img alt="Constantly Growing" src={constantlyGrowing} width="480px" />
            </div>
            <div className="col col-8 d-flex flex-column px-32" data-aos="fade-left" data-aos-duration="800">
              <h1 className="text-light my-8" style={{ fontSize: 54 }} data-aos="fade-up" data-aos-duration="1000">
                We are constantly growing
              </h1>
              <p className="text-light" style={{ fontSize: 20, lineHeight: 2 }} data-aos="fade-up" data-aos-duration="1000">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
              </p>
              <img className="my-10" alt="Growth statistics" src={rocket} data-aos="fade-up" data-aos-duration="1000" />
              <div className="d-flex flex-fill justify-content-between text-light" data-aos="fade-up" data-aos-duration="1000">
                <div className="d-flex flex-column text-center justify-content-center">
                  <h3 className="text-light">{businessStats?.partnersCount || 0}</h3>
                  <p className="text-light small">Total Partners</p>
                </div>

                <div className="d-flex flex-column text-center justify-content-center">
                  <h3 className="text-light">{businessStats?.opportunityCount || 0}</h3>
                  <p className="text-light small">Total Opportunities</p>
                </div>

                <div className="d-flex flex-column text-center justify-content-center">
                  <h3 className="text-light">
                    {businessStats?.contractsAwarded?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                    }) || 0}
                  </h3>
                  <p className="text-light small">Total Opportunities</p>
                </div>
              </div>
            </div>
          </section>

          <section className="row d-flex align-items-center mt-16">
            <div className="col col-6" data-aos="fade-right" data-aos-duration="800">
              <div className="px-20">
                <h1>
                  <strong>Warm Introductions that lead to contracts</strong>
                </h1>
                <p className="text-black font-size-4">Meet some of the Top Black owned businesses in your state</p>
              </div>
            </div>
            <div className="col col-6 p-0 m-0 " data-aos="fade-left" data-aos-duration="800">
              <img className="w-100 object-cover" alt="warm_introduction" src={warmIntroduction} />
            </div>
          </section>

          <section className="row d-flex align-items-center  mt-16">
            <div className="col col-6 p-0 m-0" data-aos="fade-right" data-aos-duration="800">
              <img className="w-100 object-cover" alt="business_community" src={businessCommunity} />
            </div>
            <div className="col col-6" data-aos="fade-left" data-aos-duration="800">
              <div className="px-20">
                <h1>
                  <strong>A direct line to the business community</strong>
                </h1>
                <p>Meet some of the Top Black owned businesses in your state</p>
              </div>
            </div>
          </section>

          <section className="row bg-sky d-flex py-20 mt-16">
            <div className="col col-6 d-flex" data-aos="fade-down" data-aos-duration="1000">
              <div className="px-10 my-auto">
                <h1>Leave the due diligence to us</h1>
                <p className="text-black font-size-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam itaque nemo, adipisci alias quibusdam, totam eveniet
                  praesentium numquam velit sunt ullam dignissimos at inventore maiores voluptatibus quae officiis iure ab.
                </p>
                <p className="text-black font-size-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt cumque nulla quam voluptate blanditiis
                  repellendus vitae, odio facere, minus modi sint et distinctio! Temporibus ducimus sint itaque veniam ex, doloremque
                  quam ratione nobis repellat. Beatae impedit ipsa quam sunt eaque. Dolor, quae quas maiores illo eum soluta quos. Quam.
                </p>
              </div>
            </div>
            <div className="col col-6 d-flex flex-row-reverse" data-aos="fade-left" data-aos-duration="800">
              <img src={dueDiligence} alt="dueDiligence" width={550} height={360} />
            </div>
            <div className="row w-100">
              <div className="col col-12 w-100 d-flex justify-content-center mt-10" data-aos="fade-up" data-aos-duration="800">
                <img src={diligenceLogos} alt="diligence_logos" height={50} />
              </div>
            </div>
          </section>

          <section className="row mt-16">
            <div className="col col-12 d-flex justify-content-center" data-aos="fade-up" data-aos-duration="1000">
              <h1>
                <strong>How to working with our business</strong>
              </h1>
            </div>
          </section>

          <section className="row mt-16 d-flex align-items-center">
            <div className="col col-6 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="500">
              <div>
                <h1 className="text-light-gray">01.</h1>
              </div>
              <div className="ml-5">
                <h1>
                  <strong>Consultation</strong>
                </h1>
                <p className="text-black font-size-4">Get a competitive edge in working with our business</p>
              </div>
            </div>
            <div
              className="col col-6 d-flex align-items-center justify-content-center "
              style={{ height: "350px" }}
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              <div>
                <img src={line} alt="line" style={{ width: "700px" }} />
              </div>
              <img src={consultation} alt="consultation" style={{ position: "absolute" }} />
            </div>
          </section>

          <section className="row mt-25 d-flex align-items-center">
            <div
              className="col col-6 d-flex align-items-center justify-content-center"
              style={{ height: "350px" }}
              data-aos="fade-right"
              data-aos-duration="500"
            >
              <div>
                <img src={line} alt="line" style={{ width: "700px" }} />
              </div>
              <img src={opportunity} alt="opportunity" style={{ position: "absolute" }} />
            </div>
            <div className="col col-6 d-flex justify-content-center" data-aos="fade-left" data-aos-duration="500">
              <div>
                <h1 className="text-light-gray">02.</h1>
              </div>
              <div className="ml-5">
                <h1>
                  <strong>Post Opportunity</strong>
                </h1>
                <p className="text-black font-size-4">Diversify your supply chain</p>
              </div>
            </div>
          </section>

          <section className="row mt-25 d-flex align-items-center">
            <div className="col col-6 d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="500">
              <div>
                <h1 className="text-light-gray">03.</h1>
              </div>
              <div className="ml-5">
                <h1>
                  <strong>Review Proposals</strong>
                </h1>
                <p className="text-black font-size-4">Easily manage proposals</p>
              </div>
            </div>
            <div
              className="col col-6 d-flex align-items-center justify-content-center"
              style={{ height: "350px" }}
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              <div>
                <img src={line} alt="line" style={{ width: "700px" }} />
              </div>
              <img src={proposals} alt="proposals" style={{ position: "absolute" }} />
            </div>
          </section>

          <section className="row mt-25 d-flex align-items-center">
            <div
              className="col col-6 d-flex align-items-center justify-content-center"
              style={{ height: "350px" }}
              data-aos="fade-right"
              data-aos-duration="500"
            >
              <div>
                <img src={line} alt="line" style={{ width: "700px" }} />
              </div>
              <img src={hire} alt="hire" style={{ position: "absolute" }} />
            </div>
            <div className="col col-6 d-flex justify-content-center" data-aos="fade-left" data-aos-duration="500">
              <div>
                <h1 className="text-light-gray">04.</h1>
              </div>
              <div className="ml-5">
                <h1>
                  <strong>Hire</strong>
                </h1>
                <p className="text-black font-size-4">Contract with our business</p>
              </div>
            </div>
          </section>

          <section className="row d-flex align-items-center mt-32 border-top-theme-dashed pt-16">
            <div className="col col-6 d-flex" data-aos="fade-right" data-aos-duration="800">
              <div className="mx-auto">
                <h1>
                  <strong>Know your spend</strong>
                </h1>
                <p className="text-black font-size-4">Easily track how much you have spent with our businesses</p>
              </div>
            </div>
            <div className="col col-6 d-flex align-items-center justify-content-center" data-aos="fade-left" data-aos-duration="800">
              {/* <img style={{ position: "relative" }} src={line} alt="line" /> */}
              <img src={partner_statistics} alt="partner_statistics" width="100%" height="100%" />
            </div>
          </section>

          <section className="row bg-sky mt-16 py-20 d-flex align-items-center">
            <div className="col-12 d-flex justify-content-center mb-15" data-aos="zoom-in" data-aos-duration="600">
              <h1>
                <strong>How we can help</strong>
              </h1>
            </div>

            <div className="row d-flex mx-auto w-90 flex-wrap justify-content-around">
              <div className="col-3 bg-white rounded-3" data-aos="fade-up" data-aos-duration="600">
                <div className="py-15 px-8">
                  <img src={accountManager} alt="account_manager" />
                  <h4 className="mt-10">Account Manager</h4>
                  <p className="text-black font-size-3 mt-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat magni ea impedit sapiente animi? Obcaecati
                    perferendis laborum temporibus numquam aut, odit asperiores, ex fugiat ipsum explicabo at dignissimos nulla ad.
                  </p>
                </div>
              </div>
              <div className="col-3 bg-white rounded-3" data-aos="fade-up" data-aos-duration="600">
                <div className=" py-15 px-8">
                  <img src={programSuccessManager} alt="program_success_manager" />
                  <h4 className="mt-10">Program Success Manager</h4>
                  <p className="text-black font-size-3 mt-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat magni ea impedit sapiente animi? Obcaecati
                    perferendis laborum temporibus numquam aut, odit asperiores, ex fugiat ipsum explicabo at dignissimos nulla ad.
                  </p>
                </div>
              </div>
              <div className="col-3 bg-white rounded-3" data-aos="fade-up" data-aos-duration="600">
                <div className="py-15 px-8">
                  <img src={companyAmbassador} alt="company_ambassador" />

                  <h4 className="mt-10">Company Ambassador</h4>
                  <p className="text-black font-size-3 mt-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat magni ea impedit sapiente animi? Obcaecati
                    perferendis laborum temporibus numquam aut, odit asperiores, ex fugiat ipsum explicabo at dignissimos nulla ad.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="row bg-black-2 d-flex align-items-center py-18">
            <div className="col col-6 d-flex">
              <div className="mx-auto ">
                <h1 data-aos="fade-up" data-aos-duration="800">
                  {" "}
                  <strong className="text-white text-uppercase">
                    Let&apos;s change <br></br>the world
                  </strong>
                </h1>
                <p className="text-white font-size-4 mt-8" data-aos="fade-up" data-aos-duration="800">
                  {" "}
                  Your company made for this{" "}
                </p>
                <div className="mt-10" data-aos="fade-up" data-aos-duration="800">
                  {/* @ts-ignore */}
                  <Button medium textUpperCase handleClick={toggleScheduleCall} text="Schedule a Call" />
                </div>
              </div>
            </div>

            <div className="col col-6 d-flex align-items-center justify-content-center " data-aos="fade-left" data-aos-duration="800">
              <img src={changeWorld} alt="change_world" />
            </div>
          </section>
        </div>
      </PageWrapperContent>
    </div>
  );
};
export default OurPartnersPage;

export async function getServerSideProps(_) {
  const businessStats = await statsService.getStatsForBusinesses();
  return {
    props: {
      businessStats,
    },
  };
}

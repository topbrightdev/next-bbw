// @PACKAGES
import React, { useState, useEffect, useContext } from "react";
import { Nav, Tab } from "react-bootstrap";
import nookies from "nookies";
import { capitalize } from "lodash";
import amplitude from "@config/amplitude";
// @COMPONENTS
import OpportunityCard from "@components/OpportunityCard/OpportunityCard";
import { LoggedInLayout } from "@components/Layout";

// @SERVICES
import { getSolicitationRequirementByBusinessId } from "@services/SolicitationRequirement";
import { getCommitmentByBusinessId } from "@services/Commitment";
import { getConnectingOpportunities, getConnectingPrograms, getConnectingResources } from "@services/Contracts";
import { getBusinessWithDetailsById } from "@services/Business";
import { getProfileAvatarUrl } from "@services/Storage";
// @CONTEXT
import DataContext from "@context/DataContext";
import GlobalContext from "@context/GlobalContext";
//UTILS
import { DefaultValues } from "@utils/constants";
import { BUSINESS_CONTACT_INFORMATION_VIEWED } from "@utils/events";
// @ASSETS
import suitCaseIcon from "@image/svg/suitcase.svg";
import flashIcon from "@image/svg/flash.svg";

import { useRouter } from "next/router";
const CandidateProfile = ({ partner, requirement, commitment, opportunityList, partnerPrograms, partnerResources }) => {
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const { loading, currentUser, businessWithDetails, currentUserWithDetails } = useContext(DataContext);
  const globalContext = useContext(GlobalContext);
  const router = useRouter();

  const handleContactUs = () => {
    handleLogEvent();
    globalContext.toggleContactUsModal();
  };
  const handleLogEvent = () => {
    const { id, firstName, lastName, email } = currentUserWithDetails;
    amplitude.logEvent(BUSINESS_CONTACT_INFORMATION_VIEWED, {
      viewedBusiness: { name: partner.name, id: partner.id, type: partner.type },
      user: {
        id: id,
        name: `${firstName} ${lastName}`,
        email: email[0].email,
        business: { name: businessWithDetails.name, id: businessWithDetails.id, type: businessWithDetails.type },
      },
      time: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    });
  };
  const fetchAvatar = async () => {
    const avatar = await getProfileAvatarUrl(partner.mediaId, DefaultValues.BUSINESS);
    setCurrentAvatar(avatar);
  };
  useEffect(() => {
    if (partner.mediaId) {
      fetchAvatar();
    }
  }, [partner.mediaId]);
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/");
    }
  }, [loading]);

  return (
    <LoggedInLayout backButton contactModal businessEmail={partner.email}>
      <div className="row">
        <div className="col-12 mb-6">
          <div className="bg-white rounded-4 pt-11 pb-11 shadow-9">
            <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
              <a className="mr-xs-7 mb-5 mb-xs-0" href={partner?.website} target="_blank" rel="noreferrer">
                <div className="bg-white mt-5 company-detail-container border">
                  <img src={currentAvatar} className="sideBar-company-logo object-contain" alt="business_image" />
                </div>
              </a>
              <div className="d-flex justify-between p-5 w-100">
                <div className="w-50">
                  <h2 className="mt-xs-n5">
                    <a className="font-size-6 text-black-2 font-weight-semibold">{partner?.name} </a>
                  </h2>
                  <p className="text-gray font-size-3 font-weight-semibold">{partner?.type.replace("PARTNER", "").trim()}</p>
                  <img src={suitCaseIcon} width={25} height={25} />
                  <span className="mb-0 text-gray font-size-4">
                    {"  "} &nbsp;
                    {partner?.categoryId}
                  </span>
                  <span className="text-black mx-2">&bull;</span>
                  <img src={flashIcon} width={22} height={22} />
                  <span className="mb-0 text-gray font-size-4">
                    {"  "} &nbsp;
                    {opportunityList.length}
                    {"  "}{" "}
                    {opportunityList.length === 1
                      ? `${partner.type.toLowerCase() === "partner trading" ? "Opportunity" : "Resource"}`
                      : `${partner.type.toLowerCase() === "partner trading" ? "Opportunities" : "Resources"}`}
                  </span>
                </div>
                <div className="w-50 d-flex align-items-center justify-content-center">
                  <button
                    onClick={handleContactUs}
                    role="button"
                    className="btn pointer btn-primary btn-medium w-10 rounded-5 text-center text-uppercase py-9"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        {/* <!-- Company Profile --> */}
        <div className="col-12">
          <div className="bg-white rounded-4 pt-11 shadow-9">
            {/* <!-- Tab Section Start --> */}
            <Tab.Container id="left-tabs-example" defaultActiveKey="company">
              <Nav className="nav border-bottom border-mercury pl-12" role="tablist">
                <li className="tab-menu-items nav-item pr-8">
                  <Nav.Link eventKey="company" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
                    About
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-8">
                  <Nav.Link eventKey="commitments" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
                    Commitment
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-8">
                  {partner.type.toLowerCase() === "partner trading" ? (
                    <Nav.Link eventKey="business" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
                      Doing Business
                    </Nav.Link>
                  ) : (
                    <Nav.Link eventKey="programs" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
                      Programs {<span className="bg-black-2 px-4 text-white rounded">{partnerPrograms?.length}</span>}
                    </Nav.Link>
                  )}
                </li>
                <li className="tab-menu-items nav-item pr-8">
                  {partner.type.toLowerCase() === "partner trading" ? (
                    <Nav.Link eventKey="jobs" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
                      Opportunities {<span className="bg-black-2 px-4 text-white rounded">{opportunityList?.length}</span>}
                    </Nav.Link>
                  ) : (
                    <Nav.Link eventKey="resources" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
                      Resources {<span className="bg-black-2 px-4 text-white rounded">{partnerResources?.length}</span>}
                    </Nav.Link>
                  )}
                </li>
              </Nav>
              {/* <!-- Tab Content --> */}
              <Tab.Content className="pl-12 pt-10 pb-7 pr-12 ">
                <Tab.Pane eventKey="company">
                  {/* <!-- Middle Body Start --> */}
                  <div className="row">
                    {/* <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg- col-md-3 col-xs-6 ">
                      <div className="mb-8 bg-concrete p-5 rounded-5">
                        <p className="font-size-4">Partner type</p>
                        <h5 className="font-size-5 font-weight-bold text-black-2">
                          {capitalize(partner.type.replace("PARTNER", "").trim().toLowerCase())}
                        </h5>
                      </div>
                    </div>

                    {/* <!-- Single Widgets End --> */}
                    {/* <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-3 col-md-3 col-xs-6">
                      <div className="mb-8 bg-concrete p-5 rounded-5">
                        <p className="font-size-4">Size</p>
                        <h5 className="font-size-5 font-weight-bold text-black-2">{partner?.employees}</h5>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End --> */}
                    {/* <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-3 col-md-3 col-xs-6">
                      <div className="mb-8 bg-concrete p-5 rounded-5">
                        <p className="font-size-4">Location</p>
                        <h5 className="font-size-5 font-weight-bold text-black-2">
                          {partner?.city}, {partner?.state}
                        </h5>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3 col-md-3 col-xs-6">
                      <div className="mb-8 bg-concrete p-5 rounded-5">
                        <p className="font-size-4 ">Founded</p>
                        <h5 className="font-size-5 font-weight-bold text-black-2">{partner?.yearFounded}</h5>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End --> */}
                  </div>
                  {/* <!-- Middle Body End --> */}
                  {/* <!-- Excerpt Start --> */}
                  <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold">About us</h4>
                  <div className="pt-5 ">
                    <p className="font-size-4 mb-8">{partner?.description}</p>
                  </div>
                  {/* <!-- Excerpt End --> */}
                </Tab.Pane>

                <Tab.Pane eventKey="commitments">
                  {/* <!-- Excerpt Start --> */}
                  <div className="pr-xl-0 pr-xxl-22 pt-5">
                    <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold">Our commitment</h4>
                    <p
                      className="font-size-4 mb-8"
                      style={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {commitment?.description}
                    </p>
                  </div>
                  {/* <!-- Excerpt End --> */}
                </Tab.Pane>

                {partner.type.toLowerCase() === "partner trading" ? (
                  <Tab.Pane eventKey="business">
                    <div className="pr-xl-0 pr-xxl-22 pt-5">
                      <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold">Doing business with us</h4>
                      <p className="font-size-4 mb-8">{requirement?.description}</p>
                    </div>

                    {/* <!-- Excerpt End --> */}
                  </Tab.Pane>
                ) : (
                  <Tab.Pane eventKey="programs">
                    <div className="pr-xl-0 pr-xxl-15 pt-5">
                      <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold">Our Programs</h4>
                      <div className="col-xl-11 col-md-8 col-xs-12 ">
                        {/* <!-- form --> */}
                        {/* <Search partners /> */}
                        <div className="pt-5 ml-lg-0 ml-md-5">
                          <div className="pt-3">
                            <div className="row">
                              {partnerPrograms.map((opp, idx) => (
                                <OpportunityCard
                                  handleContactUs={handleContactUs}
                                  key={idx}
                                  id={opp?.id}
                                  type={opp?.type}
                                  description={opp?.description}
                                  title={opp?.title}
                                  additionalResources={opp?.additionalResources}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                )}

                {partner.type.toLowerCase() === "partner trading" ? (
                  <Tab.Pane eventKey="jobs">
                    <div className="pt-5">
                      <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold">Current Opportunities</h4>

                      {/* <!-- form --> */}
                      {/* <Search partners /> */}
                      <div className="pt-5 ml-lg-0">
                        <div className="pt-3">
                          <div className="row">
                            {opportunityList.map((opp, idx) => (
                              <>
                                <OpportunityCard
                                  handleContactUs={handleContactUs}
                                  key={idx}
                                  id={opp?.id}
                                  type={opp?.type}
                                  description={opp?.description}
                                  title={opp?.title}
                                  additionalResources={opp?.additionalResources}
                                />
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Excerpt End --> */}
                  </Tab.Pane>
                ) : (
                  <Tab.Pane eventKey="resources">
                    <div className="pr-xl-0 pr-xxl-15 pt-5">
                      <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold">Our Resources</h4>
                      <div className="col-xl-11 col-md-8 col-xs-12 ">
                        {/* <!-- form --> */}
                        {/* <Search partners /> */}
                        <div className="pt-5 ml-lg-0 ml-md-5">
                          <div className="pt-3">
                            <div className="row">
                              {partnerResources.map((opp, idx) => (
                                <OpportunityCard
                                  handleContactUs={handleContactUs}
                                  key={idx}
                                  id={opp?.id}
                                  type={opp?.type}
                                  description={opp?.description}
                                  title={opp?.title}
                                  additionalResources={opp?.additionalResources}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Excerpt End --> */}
                  </Tab.Pane>
                )}
              </Tab.Content>
              {/* <!-- Tab Content End --> */}
              {/* <!-- Tab Section End --> */}
            </Tab.Container>
            <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 light-mode-texts">
              {partner.assets && partner.assets.length > 0 && (
                <>
                  <div className="row align-items-center justify-content-left border-top">
                    <div className="single-brand-logo mx-5 mt-6 mr-2">
                      {partner.assets.map((image, index) => (
                        <img key={`partner-assets-${index}`} src={image} alt="Black business warehouse" />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export async function getServerSideProps(context) {
  const { userId, BUSINESS_TYPE: type } = nookies.get(context);
  if (!userId || !type) {
    return {
      props: {},
    };
  }

  const partner = await getBusinessWithDetailsById(context.query.partner);
  const isTrading = partner.type.toLowerCase() === "partner trading";
  const { mediaId, email, phone, categoryId, subcategory, certification } = partner;
  partner.mediaId = mediaId.source;
  partner.phone = Array.isArray(phone) ? phone?.[0]?.phone || "" : "";
  partner.email = Array.isArray(email) ? email?.[0]?.email || "" : "";
  partner.categoryId = categoryId.name;
  partner.subcategory = subcategory.map((subcat) => subcat.name);
  partner.certification = certification.map((cert) => cert.name);

  let [commitment, requirement, progOpp, resources] = await Promise.all([
    getCommitmentByBusinessId(partner.id),
    getSolicitationRequirementByBusinessId(partner.id),
    isTrading ? getConnectingOpportunities(partner.id) : getConnectingPrograms(partner.id),
    isTrading ? null : getConnectingResources(partner.id),
  ]);

  if (!requirement) {
    requirement = { description: "" };
  }
  if (!commitment) {
    commitment = { description: "" };
  }
  return {
    props: {
      partner,
      requirement,
      commitment,
      type,
      isTrading,
      opportunityList: isTrading ? progOpp : [],
      partnerPrograms: isTrading ? [] : progOpp,
      partnerResources: isTrading ? [] : resources,
    },
  };
}

export default CandidateProfile;

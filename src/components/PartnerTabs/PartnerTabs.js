import { Nav, Tab } from "react-bootstrap";
import PartnerCommitmentForm from "../PartnerCommitmentForm";
import PartnerDoingBusinessForm from "../PartnerDoingBusinessForm";
import PartnerOpportunitiesForm from "../PartnerOpportunitiesForm";
import BusinessOverViewForm from "../BusinessOverViewForm";
import BusinessContactForm from "../BusinessContactForm";
import BusinessSnapShotForm from "../BusinessSnapShotForm";
import DataContext from "../../context/DataContext";
import { useContext, useState, useEffect } from "react";
import { collectionNames } from "./../../utils/constants";
import { db } from "../../config/firebase";
const PartnerTabs = () => {
  const { business } = useContext(DataContext);
  const [partnerOpportunities, setPartnerOpportunities] = useState(0);
  useEffect(() => {
    let unsubscribe;
    async function setOpportunity() {
      unsubscribe = await db
        .collection(collectionNames.CONTRACTS_COLLECTION)
        .where("businessId", "==", business.id)
        .onSnapshot((querySnapShot) => {
          let opportunities = 0;
          querySnapShot.forEach((_doc) => {
            opportunities += 1;
          });
          setPartnerOpportunities(opportunities);
        });
    }
    if (business) {
      setOpportunity();
    }
    return unsubscribe;
  }, [business]);
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
        <Nav className="nav border-bottom border-mercury pl-12" role="tablist">
          <li className="tab-menu-items nav-item pr-8">
            <Nav.Link eventKey="overview" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              Overview
            </Nav.Link>
          </li>
          <li className="tab-menu-items nav-item pr-8">
            <Nav.Link eventKey="contact" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              Contact info
            </Nav.Link>
          </li>
          <li className="tab-menu-items nav-item pr-8">
            <Nav.Link eventKey="snapshot" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              Snapshot
            </Nav.Link>
          </li>
          <li className="tab-menu-items nav-item pr-8">
            <Nav.Link eventKey="commitment" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              Commitment
            </Nav.Link>
          </li>
          <li className="tab-menu-items nav-item pr-8">
            <Nav.Link eventKey="doing-business" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              Doing Business
            </Nav.Link>
          </li>
          <li className="tab-menu-items nav-item pr-8">
            <Nav.Link eventKey="opportunities" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              {business?.type === "PARTNER TRADING" ? "Opportunities" : "Resources"}{" "}
              {<span className="bg-black-2 px-4 text-white rounded">{partnerOpportunities}</span>}
            </Nav.Link>
          </li>
        </Nav>
        <Tab.Content className="pl-12 pt-10 pb-7 pr-12 ">
          <Tab.Pane eventKey="overview">
            <BusinessOverViewForm />
          </Tab.Pane>
          <Tab.Pane eventKey="contact">
            <BusinessContactForm />
          </Tab.Pane>
          <Tab.Pane eventKey="snapshot">
            <BusinessSnapShotForm />
          </Tab.Pane>
          <Tab.Pane eventKey="commitment">
            <PartnerCommitmentForm />
          </Tab.Pane>
          <Tab.Pane eventKey="doing-business">
            <PartnerDoingBusinessForm />
          </Tab.Pane>
          <Tab.Pane eventKey="opportunities">
            <PartnerOpportunitiesForm />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default PartnerTabs;

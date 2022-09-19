import { Nav, Tab } from "react-bootstrap";
import BusinessOverViewForm from "../BusinessOverViewForm";
import BusinessContactForm from "../BusinessContactForm";
import BusinessSnapShotForm from "../BusinessSnapShotForm";

const BusinessTabs = () => {
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
            <Nav.Link eventKey="contact-info" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              Contact Info
            </Nav.Link>
          </li>
          <li className="tab-menu-items nav-item pr-8">
            <Nav.Link eventKey="business-snapshot" className="text-uppercase font-size-3 font-weight-bold text-dark-gray py-3 px-0">
              Business Snapshot
            </Nav.Link>
          </li>
        </Nav>
        <Tab.Content className="pl-12 pt-10 pb-7 pr-12 ">
          <Tab.Pane eventKey="overview">
            <BusinessOverViewForm />
          </Tab.Pane>
          <Tab.Pane eventKey="contact-info">
            <BusinessContactForm />
          </Tab.Pane>
          <Tab.Pane eventKey="business-snapshot">
            <BusinessSnapShotForm />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default BusinessTabs;

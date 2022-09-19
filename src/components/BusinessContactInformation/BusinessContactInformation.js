//PACKAGES
import React, { useContext } from "react";
//COMPONENTS
import locationContact from "@image/svg/locationContact.svg";
import phoneContact from "@image/svg/phoneContact.svg";
import emailContact from "@image/svg/emailContact.svg";
import websiteContact from "@image/svg/websiteContact.svg";
import { Button } from "@components/Common";
//AMPLITUDE
import amplitude from "@config/amplitude";
//UTILS
import { BUSINESS_CONTACT_INFORMATION_COPIED } from "@utils/events";
// @CONTEXT
import DataContext from "@context/DataContext";

const Sidebar = ({ website, city, state, email, phone, handleContactUs, logo, name, type, id }) => {
  const { businessWithDetails, currentUserWithDetails } = useContext(DataContext);
  const handleCopy = (e) => {
    e.preventDefault();
    handleLogEvent();
  };
  const handleLogEvent = () => {
    const { id: userId, firstName, lastName, email } = currentUserWithDetails;
    amplitude.logEvent(BUSINESS_CONTACT_INFORMATION_COPIED, {
      viewedBusiness: { name: name, id: id, type: type },
      user: {
        id: userId,
        name: `${firstName} ${lastName}`,
        email: email[0].email,
        business: { name: businessWithDetails.name, id: businessWithDetails.id, type: businessWithDetails.type },
      },
      time: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    });
  };
  return (
    <>
      {/* <!-- Sidebar Start --> */}

      {/* <!-- Top Start --> */}

      {/* <!-- Top End --> */}
      {/* <!-- Snapshot Start --> */}

      {/* <!-- Single List --> */}
      <div className="bg-concrete d-flex align-items-center rounded-3  p-5 mb-12">
        <div className="bg-white company-detail-container-2 border">
          <img src={logo} className="sideBar-company-logo object-contain" alt="black business warehouse" />
        </div>
        <div className="d-flex  text-break w-75 ml-8">
          <h5 className="font-size-8 text-black-2 my-auto">{name}</h5>
        </div>
      </div>
      <div className="mb-5 d-flex">
        <div className="bg-concrete p-3 mb-5 rounded-6 d-flex align-items-center justify-content-center">
          <img src={locationContact} width={25} height={25} />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p className="font-size-5  mb-0 text-black-2 pl-6" onCopy={handleCopy}>
            {city},{state}
          </p>
        </div>
      </div>
      <div className="mb-5 d-flex">
        <div className="bg-concrete p-3 mb-4 rounded-6 d-flex align-items-center justify-content-center">
          <img src={emailContact} width={24} height={24} />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p className="font-size-5  mb-0 text-black-2 pl-6 text-break" onCopy={handleCopy}>
            {email}
          </p>
        </div>
      </div>
      <div className="mb-5 d-flex">
        <div className="bg-concrete p-3 mb-5 rounded-6 d-flex align-items-center justify-content-center">
          <img src={phoneContact} width={24} height={24} />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p className="font-size-5  mb-0 text-black-2 pl-6" onCopy={handleCopy}>
            {phone}
          </p>
        </div>
      </div>
      <div className="mb-7 d-flex">
        <div className="bg-concrete p-3 mb-5 rounded-6 d-flex align-items-center justify-content-center">
          <img src={websiteContact} width={24} height={24} />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p className="font-size-5  mb-0 text-black-2 pl-6 text-break" onCopy={handleCopy}>
            {website}
          </p>
        </div>
      </div>
      <div className="mb-7 d-flex justify-content-end">
        <Button dark handleClick={handleContactUs} medium textUpperCase text="contact us" otherClass="font-size-3" />
      </div>
    </>
  );
};

export default Sidebar;

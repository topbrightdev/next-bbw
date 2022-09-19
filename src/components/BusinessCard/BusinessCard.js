//PACKAGES
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
//AMPLITUDE
import amplitude from "@config/amplitude";
//UTILS
import { BUSINESS_VIEWED_EVENT } from "@utils/events";
import { DefaultValues } from "@utils/constants";
//ICONS
import iconL from "@image/svg/icon-location.svg";
//CONTEXT
import DataContext from "@context/DataContext";

//SERVICES
import { getProfileAvatarUrl } from "@services/Storage";

const BusinessCard = ({ id, logo, name, category, subcategory, isActive, city, state, businessType }) => {
  const pathname = businessType === "BUSINESS" ? `/business/${id}` : `/partner/${id}`;
  const { businessWithDetails, currentUserWithDetails } = useContext(DataContext);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const handleLogEvent = () => {
    const { id, firstName, lastName, email } = currentUserWithDetails;
    amplitude.logEvent(BUSINESS_VIEWED_EVENT, {
      viewedBusiness: { name: name, id: id, type: businessType },
      user: {
        id: id,
        name: `${firstName} ${lastName}`,
        email: email[0].email,
        business: { name: businessWithDetails.name, id: businessWithDetails.id, type: businessWithDetails.type },
      },
      time: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    });
  };
  useEffect(() => {
    if (logo) {
      fetchAvatar();
    }
  }, [logo]);
  const fetchAvatar = async () => {
    const avatar = await getProfileAvatarUrl(logo, DefaultValues.BUSINESS);

    setCurrentAvatar(avatar);
  };
  return (
    <Link href={{ pathname }} passHref>
      <div
        className={` pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 mb-5 ${
          !isActive ? " pointer-events-none" : "pointer"
        }`}
        onClick={handleLogEvent}
      >
        <div className="row">
          <div className="col-md-9">
            <div className="media align-items-center">
              <div className="d-block mr-8">
                <img src={currentAvatar} alt="black business warehouse" width="75px" height="100%" />
              </div>
              <div>
                <h3 className="mb-0 font-size-6 heading-default-color">{name}</h3>
                <span className="font-size-3 text-default-color line-height-2 d-block">{category}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-8">
          <div className="col-md-8">
            <ul className="d-flex list-unstyled mr-n3 flex-wrap">
              {subcategory.map((service, index) => (
                <li key={index}>
                  <span className="bg-dark-gray min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-white mt-2 d-inline-block">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span
                  className="mr-4"
                  css={`
                    margin-top: -2px;
                  `}
                >
                  <img src={iconL} alt="" />
                </span>
                <span className="font-weight-semibold">
                  {city}, {state}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;

//PACKAGES
import React, { useContext } from "react";
//AMPLITUDE
import amplitude from "@config/amplitude";
//UTILS
import { NEWS_VIEWED_EVENT } from "@utils/events";
//CONTEXT
import DataContext from "@context/DataContext";
const ArticleCard = ({ title, description, image, domain, source }) => {
  const { businessWithDetails, currentUserWithDetails } = useContext(DataContext);
  const handleLogEvent = () => {
    const { id, firstName, lastName, email } = currentUserWithDetails;
    amplitude.logEvent(NEWS_VIEWED_EVENT, {
      url: source || "https://blackbusinesswarehouse.com/",
      user: {
        id: id,
        name: `${firstName} ${lastName}`,
        email: email[0].email,
        business: { name: businessWithDetails.name, id: businessWithDetails.id, type: businessWithDetails.type },
      },
      time: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    });
  };
  return (
    <div className="col-4 mb-8 pointer" onClick={handleLogEvent}>
      <div className="mr-5">
        <a
          className="card-title font-size-5 mt-2 mb-4 heading-default-color"
          href={source || "https://blackbusinesswarehouse.com/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {<img src={image} className="card-img article-cards-img" alt="black business warehouse" />}
        </a>
      </div>
      <div>
        <h4>
          <a className="card-title font-size-4 mt-1 mb-2 heading-default-color" href={source} target="_blank" rel="noopener noreferrer">
            {title}{" "}
          </a>
        </h4>
        <span className="font-size-3 text-default-color line-height-2 d-block">{description}</span>
        <p className="mb-0">
          <a className="font-size-3 text-default-color" href={source} target="_blank" rel="noopener noreferrer">
            {domain}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;

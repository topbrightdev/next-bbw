import iconL from "@image/link-icon.svg";
import { Button } from "@components/Common";
import { useRouter } from "next/router";
const WorkCard = ({ type, title, description, additionalResources }) => {
  const router = useRouter();

  const handleContactUs = (_) => {
    router.push("/contact");
  };
  return (
    <div className="col-3 bg-white rounded shadow w-100 py-10 px-8 bg-green d-flex flex-column justify-content-between">
      <div>
        <p className="text-gray-2 font-size-4">{type}</p>
        <h1 className="font-size-5">{title}</h1>
        <p className="text-black font-size-3 my-5 ">{description}</p>
        <h3 className="font-size-4">Additional Resources</h3>
        {additionalResources &&
          additionalResources.length > 0 &&
          additionalResources.map((resource, index) => (
            <ul
              key={`work-card-additional-resources-${index}`}
              className="font-size-4 list-unstyled mb-1 d-flex flex-wrap flex-column "
            >
              <li key={index} className="d-flex align-items-center">
                <span className="mr-3">
                  <img src={iconL} alt={`additional-resource-${index}`} />
                </span>
                <a className="text-denim font-size-3 mr-6 h-px-15" href={resource} target="_blank" rel="noreferrer">
                  {resource}
                </a>
              </li>
            </ul>
          ))}
      </div>
      <div className="mt-5">
        <Button handleClick={handleContactUs} text="contact partner" textUpperCase dark medium />
      </div>
    </div>
  );
};

export default WorkCard;

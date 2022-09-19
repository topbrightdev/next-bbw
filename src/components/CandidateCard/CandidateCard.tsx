import dollar from "@image/svg/dollar.svg";
import locationIcon from "@image/svg/location.svg";
import { startCase, toLower } from "lodash";

const CandidateCard = ({ id, status, firstName, lastName, role, experience, location, yearly, skills, handleSelectCandidate }) => {
  return (
    <div className="row bg-white shadow-4 mt-8 pb-10 m-0 p-0 pointer" onClick={() => handleSelectCandidate(id)}>
      <div className="col-12 p-0 m-0">
        <div className="d-flex justify-content-end">
          <div className="bg-light-gray px-10 py-5">
            <span className="text-black"> {startCase(toLower(status))} </span>
          </div>
        </div>
        <div className="px-15">
          <h4>
            {firstName} {lastName}
          </h4>
          <div className="d-flex flex-row ">
            <p className="text-black font-size-4">{role.name}</p>
            <span className="text-black mx-2">&bull;</span>
            <p className="text-black font-size-4">{experience} years</p>
            <span className="text-black mx-2">&bull;</span>
            <p className="text-black font-size-4">
              <img src={locationIcon} alt="location" /> {location}
            </p>
            <span className="text-black mx-2">&bull;</span>

            <p className="text-black font-size-4">
              <img src={dollar} alt="dollar" /> {yearly.amount}
            </p>
          </div>
          {skills ? (
            <div className="d-flex flex-row flex-wrap">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="mt-3 d-flex align-items-center justify-content-center bg-light-gray rounded-pill mr-5 px-10 py-2"
                >
                  <span className="text-black">{skill.title}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;

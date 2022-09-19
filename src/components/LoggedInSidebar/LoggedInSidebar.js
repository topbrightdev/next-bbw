import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FiUsers } from "react-icons/fi";
import { FaUsers, FaEnvelope } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
// import recruitingDark from "@image/svg/recruiting-dark.svg";
// import recruitingLight from "@image/svg/recruiting-light.svg";
import Logo from "../Logo";
import DataContext from "@context/DataContext";

// import settingIcon from "@image/svg/settings.svg";

const LoggedInSidebar = () => {
  const { businessWithDetails: businessInformation } = useContext(DataContext);
  const [currentLocation, setCurrentLocation] = useState("");
  useEffect(() => {
    const location = window.location.href.replace("//", "/").split("/").slice(2).join("");
    setCurrentLocation(location);
  }, []);

  return (
    <div className="col-sm-2 bg-black-2">
      <div className="d-flex flex-column h-100">
        <div className="mt-5 ml-10">
          <div className="brand-logo">
            <Logo white />
          </div>
        </div>
        <div className="mt-12 ml-10 ">
          <div className="bg-white sideBar-company-container">
            <img src={businessInformation?.logoSource} className="sideBar-company-logo" alt="black business warehouse" />
          </div>
          <h4 className="text-white mt-6">{businessInformation?.name}</h4>
        </div>
        <div className="mt-8 ml-2 px-5 border-top">
          <Link href="/businesses">
            <a className={`mt-4 px-5 py-2 rounded-3 d-block  ${currentLocation === "businesses" ? "bg-white" : ""}`}>
              {" "}
              <MdBusinessCenter size={20} color={`${currentLocation !== "businesses" ? "white" : ""}`} />
              <span className={`ml-4 ${currentLocation !== "businesses" ? "text-white" : ""}`}>Businesses</span>
            </a>
          </Link>

          <Link href="/partners">
            <a className={`mt-4 px-5 py-2 rounded-3 d-block ${currentLocation === "partners" ? "bg-white" : ""}`}>
              {" "}
              <FiUsers color={`${currentLocation !== "partners" ? "white" : ""}`} />
              <span className={`ml-4 ${currentLocation !== "partners" ? "text-white" : ""}`}>Partners</span>
            </a>
          </Link>

          <Link href="/teams">
            <a className={`mt-4 px-5 py-2 rounded-3 d-block ${currentLocation === "teams" ? "bg-white" : ""}`}>
              {" "}
              <FaUsers color={`${currentLocation !== "teams" ? "white" : ""}`} size={18} />
              <span className={`ml-4 ${currentLocation !== "teams" ? "text-white" : ""}`}>Team</span>
            </a>
          </Link>
          {/* <Link href="/recruiting">
            <a className={`mt-4 px-5 py-2 rounded-3 d-block ${currentLocation === "recruiting" ? "bg-white" : ""}`}>
              {currentLocation !== "recruiting" ? (
                <img src={recruitingLight} alt="recruiting_light" />
              ) : (
                <img src={recruitingDark} alt="recruiting" />
              )}

              <span className={`ml-4 ${currentLocation !== "recruiting" ? "text-white" : ""}`}>Recruiting</span>
            </a>
          </Link> */}
          <Link href="/edit-company">
            <a className={`mt-4 px-5 py-2 rounded-3 d-block ${currentLocation === "edit-company" ? "bg-white" : ""}`}>
              <IoMdSettings color={`${currentLocation !== "edit-company" ? "white" : ""}`} size={18} />
              <span className={`ml-4 ${currentLocation !== "edit-company" ? "text-white" : ""}`}>Settings</span>
            </a>
          </Link>
        </div>
        <div className="mt-auto mb-10 ml-2 px-5 border-top">
          <Link href="/contact">
            <a className=" mt-8 px-5 py-2  d-block ml-9">
              {" "}
              <FaEnvelope color="white" />
              <span className="ml-4 text-white">Contact us</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoggedInSidebar;

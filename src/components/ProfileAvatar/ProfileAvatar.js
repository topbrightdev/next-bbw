import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
import Overlay from "react-bootstrap/Overlay";
import _ from "lodash";

import { auth } from "../../config/firebase";

import defaultAvatar from "@image/svg/avatar-user.svg";

import DataContext from "@context/DataContext";

const ProfileAvatar = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const target = useRef(null);
  const { currentUserWithDetails: userInformation } = useContext(DataContext);

  const handleLogOut = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <>
      <img
        className="rounded-circle mr-5 pointer object-cover"
        alt="avatar"
        src={userInformation?.avatarSource || defaultAvatar}
        width="50"
        height="50"
        ref={target}
        onClick={() => setShow(!show)}
        id="avatarImage"
      />

      <Overlay rootClose={true} onHide={() => setShow(false)} target={target.current} show={show} placement="bottom">
        {({ show: _show, ...props }) => (
          <div
            className="bg-black-2 w-15"
            {...props}
            style={{
              padding: "2px 10px",
              color: "white",
              borderRadius: 8,
              ...props.style,
            }}
          >
            <div className="row d-flex align-items-center px-2 py-2">
              <div className="col-4">
                <img
                  className="rounded-circle object-cover bg-white pointer"
                  alt="avatar"
                  src={userInformation?.avatarSource || defaultAvatar}
                  width="50"
                  height="50"
                />
              </div>
              <div className="col-8 d-flex flex-column">
                <span className="white ml-1 font-size-5 text-uppercase">{userInformation?.firstName}</span>

                <span className="font-size-4 ml-1 text-gray text-uppercase">{_.capitalize(userInformation?.role)}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="mt-5 py-2  border-top">
                  <Link href="/edit-profile" passHref>
                    <a className=" mt-1 d-block ml-9" style={{ cursor: "pointer" }}>
                      <span className=" text-white">Profile setting</span>
                    </a>
                  </Link>
                  <a onClick={handleLogOut} className="mt-4 rounded-3 d-block ml-9" style={{ cursor: "pointer" }}>
                    <span className=" text-white">Sign Out</span> <BiLogOutCircle color="white" size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Overlay>
    </>
  );
};

export default ProfileAvatar;

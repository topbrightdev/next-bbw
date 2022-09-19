import { useState, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Overlay from "react-bootstrap/Overlay";
import _ from "lodash";
import { Loader } from "../Common";
import emailIcon from "../../assets/image/svg/icon-email.svg";
import phoneIcon from "../../assets/image/svg/icon-phone.svg";
import binIcon from "../../assets/image/svg/icon-bin.svg";

const ActiveUserCard = ({
  avatar,
  firstName,
  lastName,
  role,
  email,
  phone,
  occupation,
  id,
  showDeleteOption,
  handleUserDelete,
  isDeleting,
}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <div className="border-bottom p-8 mb-2">
      <div className="row">
        <div className="col-1">
          <img className="rounded-circle pointer object-cover" alt="avatar" src={avatar} width="60px" height="60px" />
        </div>
        <div className="col-4 align-self-center">
          <span className="font-size-6 text-black mr-2">
            <strong>
              {firstName} {lastName}
            </strong>
          </span>
          <span className="text-black mx-2">&bull;</span>
          <span className="text-black mx-2">{_.capitalize(role)}</span>
          <p className="text-gray font-size-small text-uppercase"> {occupation} </p>
        </div>
        {showDeleteOption ? (
          <div className="col-6 ml-auto d-flex flex-row-reverse">
            <a role="button" ref={target} onClick={() => setShow(!show)}>
              <FiMoreHorizontal className="mt-5 pointer" color="383f4c" size={25} />
            </a>
            <Overlay target={target.current} show={show} placement="left">
              {({ show: _show, ...props }) => (
                <div {...props} className="shadow text-black py-5 px-5 pointer rounded-5" onClick={() => handleUserDelete(id)}>
                  {isDeleting ? <Loader loading={isDeleting} /> : <img src={binIcon} width={24} height="100%" className="mr-2" />}{" "}
                  &nbsp; Delete User
                </div>
              )}
            </Overlay>
          </div>
        ) : null}
      </div>
      <div className="row">
        <div className="col-12 d-flex">
          <div className="mr-16">
            <img src={emailIcon} className="mr-4 justify-content-center text-center" width={32} height={32} />
            {email}
          </div>
          <div className="mr-16">
            <img src={phoneIcon} className="mr-4 justify-content-center text-center" width={32} height={32} />
            {phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUserCard;

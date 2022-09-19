import React, { useState, useRef } from "react";
import iconL from "../../assets/image/link-icon.svg";
import { FiMoreHorizontal } from "react-icons/fi";
import editIcon from "../../assets/image/svg/edit.svg";
import binIcon from "../../assets/image/svg/icon-bin.svg";
import Overlay from "react-bootstrap/Overlay";
import { Loader } from "../Common";

const OpportunityCard = (props) => {
  const [show, setShow] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const target = useRef(null);
  const { id, handleContactUs, handleEdit, handleDelete, type, description, title, additionalResources } = props;

  const deleteOpportunity = async (id) => {
    setDeleting(true);
    await handleDelete(id);
    setDeleting(false);
    setShow(false);
  };

  return (
    <>
      <div className="d-flex justify-between w-100 light-mode-texts bg-white rounded hover-shadow-hitgray border-bottom">
        <div className={`py-6 ${handleContactUs ? "w-75" : "w-100"}`}>
          <div className={handleContactUs ? "border-right" : ""}>
            {/* <!-- Single Featured Job --> */}
            <div className="pt-9 px-xl-8 px-lg-7 px-7 pb-5 ">
              <div className="media align-items-center">
                <div className="d-flex flex-row justify-content-between w-100">
                  <div>
                    <a className="font-size-4 text-default-color line-height-lg">{type}</a>
                    <h3 className="font-size-6 mb-0">
                      <a className="heading-default-color font-weight-semibold">{title}</a>
                    </h3>
                    <p className="font-size-3 text-black-2 mb-7">{description}</p>
                  </div>
                  {!handleContactUs ? (
                    <div>
                      <a role="button" ref={target} onClick={() => setShow(!show)}>
                        <FiMoreHorizontal className="mt-5 pointer" color="383f4c" size={25} />
                      </a>
                      <Overlay rootClose={true} onHide={() => setShow(false)} target={target.current} show={show} placement="left">
                        {({
                          // placement,
                          // arrowProps,
                          show: _show,
                          // popper,
                          ...props
                        }) => (
                          <div {...props} className="shadow bg-white text-black py-5 px-5 rounded-5">
                            <div className="row py-4 pr-10">
                              <div className="col-12">
                                <a role="button" onClick={() => handleEdit(id)} className=" mt-1 d-block pointer">
                                  <img src={editIcon} alt="edit icon" />
                                  <span className="ml-8">Edit</span>
                                </a>
                                <a role="button" onClick={() => deleteOpportunity(id)} className="mt-6 rounded-3 d-block pointer">
                                  {isDeleting ? <Loader dark={true} loading={isDeleting} /> : <img src={binIcon} alt="bin icon" />}{" "}
                                  <span className="ml-5">Delete</span>{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </Overlay>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="d-flex flex-row ">
                {additionalResources && additionalResources.length > 0 && (
                  <h4 className="font-size-4 mb-0 heading-default-color font-weight-semibold d-flex justify-items-center align-items-center">
                    Additional Resources:
                  </h4>
                )}
                {additionalResources &&
                  additionalResources.length > 0 &&
                  additionalResources.map((resource, index) => (
                    <ul
                      key={index}
                      className="list-unstyled mb-1 d-flex flex-wrap flex-row justify-items-center align-items-center ml-2"
                    >
                      <li>
                        <span className="mr-3">
                          <img src={iconL} alt="" />
                        </span>
                        <a className="text-denim font-size-3 mr-6 h-px-33 mt-4" href={resource} target="_blank" rel="noreferrer">
                          {resource}
                        </a>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>
            {/* <!-- End Single Featured Job --> */}
          </div>
        </div>
        {handleContactUs ? (
          <div className="w-25 d-flex align-items-center justify-content-center ">
            <a onClick={handleContactUs} className="btn btn-dark-gray text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-3">
              Contact us
            </a>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default OpportunityCard;

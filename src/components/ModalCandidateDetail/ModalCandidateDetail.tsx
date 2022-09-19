//PACKAGES
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { Button } from "@components/Common";

import { startCase, toLower } from "lodash";
//CONTEXT
import GlobalContext from "../../context/GlobalContext";
import DataContext from "./../../context/DataContext";
//LOGOS
import locationIcon from "@image/svg/location.svg";
import like from "@image/svg/like.svg";
import { useEffect } from "react";
import { getResumeUrl } from "@services/Storage";
import ModalPdfViewer from "@components/ModalPdfViewer";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalCandidateDetail = ({ selectedCandidate }) => {
  const { toggleCandidateDetailModal, candidateDetailModalVisible, togglePdfModal } = useContext(GlobalContext);
  const { businessWithDetails, currentUserWithDetails } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const handleClose = () => {
    toggleCandidateDetailModal();
  };
  const handleResumeModal = () => {
    togglePdfModal();
  };
  const handleLikeCandidate = async () => {
    try {
      setLoading(true);
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "support@blackbusinesswarehouse.com",
          receiver: "recruting@blackbusinesswarehouse.com",
          subject: `${businessWithDetails?.name} is interested in ${selectedCandidate?.firstName} ${selectedCandidate?.id}`,
          message: `${currentUserWithDetails?.firstName} ${currentUserWithDetails?.lastName}  , ${businessWithDetails?.name} , ${
            selectedCandidate?.firstName
          } ${selectedCandidate?.lastName}   ${selectedCandidate?.email?.email} ${new Date()}`,
        }),
      });
      setLoading(false);
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  useEffect(() => {
    async function getResume() {
      const url = await getResumeUrl(selectedCandidate.resume);
      setResumeUrl(url);
    }
    if (selectedCandidate) {
      getResume();
    }
  }, [selectedCandidate]);
  return (
    <ModalStyled size="lg" centered show={candidateDetailModalVisible} onHide={toggleCandidateDetailModal}>
      <Modal.Body className="p-0">
        <button type="button" className="square-32 btn-reset bg-white pos-abs-tr focus-reset z-index-supper" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
        <section className="px-20 pt-10 pb-4">
          <h3>
            {selectedCandidate?.firstName} {selectedCandidate?.lastName}
          </h3>
          <div className="d-flex flex-row mt-5">
            <p className="text-black font-size-4">{selectedCandidate?.candidateRoleId?.name}</p>
            <span className="text-black mx-2">&bull;</span>
            <p className="text-black font-size-4">{selectedCandidate?.yearsOfExperience} years</p>
            <span className="text-black mx-2">&bull;</span>
            <p className="text-black font-size-4">
              <img src={locationIcon} alt="location" /> {selectedCandidate?.location}
            </p>
            <span className="text-black mx-2">&bull;</span>
            <p className="text-black font-size-4">{startCase(toLower(selectedCandidate?.status))}</p>
          </div>
        </section>

        <section className="border-top px-20 py-8 my-4">
          <div className="row">
            <div className="col-4 d-flex align-items-start">
              <p className="font-size-4 text-gray">What i am looking for:</p>
            </div>
            <div className="col-8">
              <p className="text-black font-size-4 font-italic">{selectedCandidate?.background}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4 d-flex align-items-start">
              <p className="font-size-4 text-gray">Prefer Roles</p>
            </div>
            <div className="col-8">
              {selectedCandidate?.preferedRoles
                ? selectedCandidate.preferedRoles.map((role, index) => (
                    <p key={index} className="text-black font-size-4 ">
                      {role?.name}
                    </p>
                  ))
                : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4 d-flex align-items-start">
              <p className="font-size-4 text-gray">Rates:</p>
            </div>
            <div className="col-8">
              <p className="text-black font-size-4 ">${selectedCandidate?.candidateRates?.hourly?.amount} - Hourly Rate</p>
              <p className="text-black font-size-4 ">${selectedCandidate?.candidateRates?.monthly?.amount} - Monthly Rate</p>
              <p className="text-black font-size-4 ">${selectedCandidate?.candidateRates?.yearly?.amount} - Annual Rate</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4 d-flex align-items-start">
              <p className="font-size-4 text-gray">Top Sills:</p>
            </div>
            {selectedCandidate?.skills ? (
              <div className="col-8 d-flex flex-row flex-wrap row-gap-5">
                {selectedCandidate.skills.map((skill, index) => (
                  <div key={index} className="d-flex align-items-center justify-content-center bg-light-gray rounded-pill mr-5 px-6">
                    <span className="text-black font-size-3">{skill?.title}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="d-flex justify-content-end mt-20">
            {/* @ts-ignore */}
            <Button text="open resume" textUpperCase medium otherClass="mr-6" handleClick={handleResumeModal} />

            {/* @ts-ignore */}
            <Button text="Interested" dark textUpperCase medium logo={like} loading={loading} handleClick={handleLikeCandidate} />
          </div>
        </section>
        <ModalPdfViewer src={resumeUrl} />
      </Modal.Body>
    </ModalStyled>
  );
};
export default ModalCandidateDetail;

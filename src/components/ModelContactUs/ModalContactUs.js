import React, { useContext, useState, useEffect } from "react";

import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";

import ContactForm from "./ContactForm";
import ContactUsSuccess from "./ContactUsSuccess";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalContactUs = ({ businessEmail, userEmail }) => {
  const gContext = useContext(GlobalContext);
  const [emailSent, setEmailSent] = useState(false);
  const handleSubmitEmail = () => {
    setEmailSent(true);
  };

  const handleClose = () => {
    gContext.toggleContactUsModal();
  };

  useEffect(() => {
    setEmailSent(false);
  }, [gContext.contactUsModalVisible]);
  return (
    <ModalStyled size="md" centered show={gContext.contactUsModalVisible} onHide={gContext.toggleContactUsModal}>
      <Modal.Body className="p-0">
        <button
          type="button"
          className="square-32 btn-reset bg-white pos-abs-tr rounded focus-reset z-index-supper"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        {!emailSent ? (
          <ContactForm handleSubmitEmail={handleSubmitEmail} receiverEmail={businessEmail} userEmail={userEmail} />
        ) : (
          <ContactUsSuccess />
        )}
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalContactUs;

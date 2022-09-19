import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import emailSentIcon from "../../assets/image/svg/icon-email-sent.svg";
import emailIcon from "../../assets/image/svg/icon-email.svg";
const HEADER_ICON_SIZE = 82;

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalUserInvitation = (props) => {
  return (
    <ModalStyled {...props.style} size="md" centered show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
        {props.success && <img src={emailSentIcon} width={HEADER_ICON_SIZE} height={HEADER_ICON_SIZE} />}
        {!props.success && <FaTimesCircle color="#800" size={HEADER_ICON_SIZE} />}
      </Modal.Header>
      <Modal.Body>
        <h5>{props.success ? "Invitation was sent to:" : "Failed to send invite to:"}</h5>
        <div className="mr-16 my-10">
          <img src={emailIcon} width={48} height={48} className="mr-4" />
          {props.email}
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalUserInvitation;

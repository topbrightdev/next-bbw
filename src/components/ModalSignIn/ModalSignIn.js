import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import Otp from "./Otp";
import SignIn from "./SignIn";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalSignIn = (props) => {
  const gContext = useContext(GlobalContext);
  const [OTPSent, setOTPSent] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setOTPSent(false);
    setEmail("");
  }, [gContext.signInModalVisible]);

  const handleClose = () => {
    gContext.toggleSignInModal();
  };

  const handleRequestDemo = () => {
    gContext.toggleScheduleCall();
    handleClose();
  };

  const handleSubmitEmail = (email) => {
    setEmail(email);
    setOTPSent(true);
  };

  const handleAuthenticated = (_) => gContext.toggleSignInModal();

  return (
    <ModalStyled
      {...props}
      size={OTPSent ? "md" : "lg"}
      centered
      show={gContext.signInModalVisible}
      onHide={gContext.toggleSignInModal}
    >
      <Modal.Body className="p-0">
        <button type="button" className="square-32 btn-reset bg-white pos-abs-tr focus-reset z-index-supper" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
        {OTPSent ? (
          <Otp email={email} onAuthenticated={handleAuthenticated} />
        ) : (
          <SignIn onSubmitEmail={handleSubmitEmail} handleClose={handleClose} handleRequestDemo={handleRequestDemo} />
        )}
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalSignIn;

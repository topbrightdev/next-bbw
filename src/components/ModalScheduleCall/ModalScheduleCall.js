import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import StaticRequestCall from "./StaticRequestCall.js";
import ScheduleAccountSelect from "./ScheduleAccountSelect.js";
import ScheduleSteps from "./ScheduleSteps.js";
import ScheduleForm from "./ScheduleForm.js";
import ScheduleRequestSuccess from "./ScheduleRequestSuccess";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalScheduleCall = (props) => {
  const [account, setAccount] = useState(null);
  const [step, setStep] = useState(1);
  const [emailSent, setEmailSent] = useState(false);
  const gContext = useContext(GlobalContext);
  const user = gContext.currentUser;
  useEffect(() => {
    setAccount(null);
    setStep(1);
    setEmailSent(false);
  }, [gContext.scheduleCallModalVisible]);

  const setStepNumber = () => {
    setStep(2);
  };
  const handleSubmitEmail = () => {
    setEmailSent(true);
  };
  const setAccountType = (accountType) => {
    setAccount(accountType);
  };
  const handleClose = () => {
    gContext.toggleScheduleCall();
  };

  const handleSignIn = () => {
    gContext.toggleSignInModal();
    handleClose();
  };
  return (
    <ModalStyled
      {...props}
      size={emailSent ? "md" : "lg"}
      centered
      show={gContext.scheduleCallModalVisible}
      onHide={gContext.toggleScheduleCall}
    >
      <Modal.Body className="p-0">
        <button type="button" className="circle-32 btn-reset bg-white pos-abs-tr  focus-reset z-index-supper" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded-3 overflow-hidden">
          <div className="row no-gutters">
            {!emailSent ? (
              <>
                <StaticRequestCall accountType={account} />
                <div className="col-lg-7 col-md-6 col-sm-12">
                  <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                    <ScheduleSteps stepNumber={step} />

                    {step == 2 ? (
                      <ScheduleForm accountType={account} handleSubmitEmail={handleSubmitEmail} handleSignIn={handleSignIn} />
                    ) : (
                      <ScheduleAccountSelect
                        accountType={account}
                        setAccount={setAccountType}
                        setStepNumber={setStepNumber}
                        handleSignIn={handleSignIn}
                      />
                    )}
                    {!user && (
                      <p className="font-size-3 heading-default-color">
                        Already have an account{" "}
                        <a onClick={handleSignIn} className="text-primary text-black-2 font-weight-bold ">
                          <u>Sign in</u>
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <ScheduleRequestSuccess />
            )}
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalScheduleCall;

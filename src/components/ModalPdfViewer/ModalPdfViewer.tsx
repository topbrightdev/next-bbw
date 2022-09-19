//PACKAGES
import { useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import PdfFile from "@components/PdfFile";
//CONTEXT
import GlobalContext from "@context/GlobalContext";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalPdfViewer = ({ src }) => {
  const { pdfModalVisible, togglePdfModal } = useContext(GlobalContext);
  const handleClose = () => {
    togglePdfModal();
  };
  return (
    <ModalStyled size="lg" centered show={pdfModalVisible} onHide={togglePdfModal}>
      <Modal.Body>
        <button type="button" className="square-32 btn-reset bg-white pos-abs-tr focus-reset z-index-supper" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
        <PdfFile src={src} />
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalPdfViewer;

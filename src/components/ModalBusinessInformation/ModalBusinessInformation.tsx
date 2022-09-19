//PACKAGES
import { FC, useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
//COMPONENTS
import BusinessContactInformation from "@components/BusinessContactInformation";
//CONTEXT
import GlobalContext from "@context/GlobalContext";
//INTERFACES
interface ModalBusinessInformationProps {
  id: string;
  type: string;
  name: string;
  logo: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  handleContactUs(): any;
}
//OTHER
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalBusinessInformation: FC<Partial<ModalBusinessInformationProps>> = ({
  handleContactUs,
  id,
  type,
  city,
  state,
  phone,
  email,
  website,
  logo,
  name,
}) => {
  const { businessInformationModalVisible, toggleBusinessInformationModal } = useContext(GlobalContext);
  const handleClose = () => {
    toggleBusinessInformationModal();
  };
  return (
    <ModalStyled size="lg" centered show={businessInformationModalVisible} onHide={toggleBusinessInformationModal}>
      <Modal.Body className="p-0">
        <button
          type="button"
          className="square-32 btn-reset bg-white pos-abs-tr rounded focus-reset z-index-supper"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
          {""}
        </button>
        <div className="bg-white overflow-hidden">
          <div className="row no-gutters px-10 py-3">
            <div className="col-l-12 col-md-12 col-sm-12 pt-11 px-md-12 px-0 pb-6 d-flex flex-column py-10">
              <h5 className="font-size-9 text-black-2 line-height-reset pb-md-4 line-height-1p4 mb-5">Contact Info</h5>

              <div>
                <BusinessContactInformation
                  name={name}
                  website={website}
                  city={city}
                  state={state}
                  logo={logo}
                  email={email}
                  phone={phone}
                  handleContactUs={handleContactUs}
                  id={id}
                  type={type}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};
export default ModalBusinessInformation;

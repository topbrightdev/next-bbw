import React, { useContext, useState, useRef, useEffect } from "react";
import { allowedImageExtensions } from "../../utils/constants";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import cameraIcon from "../../assets/image/svg/camera.svg";
import { Loader } from "../Common";
import ReactCrop from "react-image-crop";
import { uploadProfileAvatar } from "../../services/Storage";
import { updateUserProfileAvatar } from "../../services/User";
import { toast } from "react-toastify";
import { addMedia, updateMedia } from "@services/Media";
import { BsCheckCircle } from "react-icons/bs";
import DataContext from "@context/DataContext";
import { DefaultValues } from "@utils/constants";
import { updateBusinessProfileLogo } from "@services/Business";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalUploadPhoto = ({ userId, onChange, mediaId, type }) => {
  const gContext = useContext(GlobalContext);
  const { updateUserAvatarSource, updateBusinessLogoSource } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  let filePickerRef = useRef();
  const handleClick = () => !src && filePickerRef.click();

  const handleChooseDifferentImage = () => {
    setDefault();
    filePickerRef.click();
  };

  const handleChange = (event) => event.target.files[0] && setSrc(URL.createObjectURL(event.target.files[0]));

  const handleClose = () => {
    setDefault();
    gContext.toggleUploadImageModal();
  };

  const setDefault = () => {
    setSrc(null);
    setImage(null);
    setResult(null);
  };

  const getCroppedImg = (_) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  };
  const handleUploadPhoto = async () => {
    setLoading(true);
    getCroppedImg();
  };
  const handleSelect = () => {
    onChange(result);
  };
  useEffect(() => {
    async function uploadPhoto() {
      let avatarPath;
      if (type === DefaultValues.BUSINESS) {
        avatarPath = await uploadProfileAvatar(userId, result, DefaultValues.BUSINESS);
      } else {
        avatarPath = await uploadProfileAvatar(userId, result, DefaultValues.USER);
      }
      if (mediaId) {
        await updateMedia(mediaId, { source: avatarPath });
      } else {
        const id = await addMedia({ source: avatarPath });
        if (type === DefaultValues.BUSINESS) {
          await updateBusinessProfileLogo(userId, id);
        } else {
          await updateUserProfileAvatar(userId, id);
        }
      }
      handleSelect();
      // await refreshUserData();
      setLoading(false);
    }
    if (result) {
      if (type === DefaultValues.BUSINESS) {
        updateBusinessLogoSource(result);
      } else {
        updateUserAvatarSource(result);
      }
      uploadPhoto();
      setDefault();
      toast("Profile Image uploaded successfully", {
        className: "bg-dark",
        bodyClassName: "text-white",
        icon: <BsCheckCircle color="#ffffff" size={30} />,
      });
      handleClose();
    }
  }, [result]);
  return (
    <ModalStyled size="md" centered show={gContext.uploadImageModalVisible} onHide={gContext.toggleUploadImageModal}>
      <Modal.Body className="p-0">
        <button
          type="button"
          className="square-32 btn-reset bg-white pos-abs-tr rounded focus-reset z-index-supper"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white overflow-hidden">
          <div className="row no-gutters">
            <div className="col-l-12 col-md-12 col-sm-12 pt-11 px-md-12 px-0 pb-6 d-flex flex-column py-10">
              <h5 className="font-size-6 text-black-2 line-height-reset pb-md-4 line-height-1p4">Editing avatar</h5>
              <input
                className="d-none"
                ref={(inp) => (filePickerRef = inp)}
                type="file"
                accept={allowedImageExtensions.map((ext) => `image/${ext}`).join(", ")}
                onChange={handleChange}
              />
              <div
                onClick={handleClick}
                className={`rounded-3 border-dashed w-100 d-flex flex-column align-items-center justify-content-center  bg-light-concrete  ${
                  !src && "pointer"
                }`}
                style={{ minHeight: "350px" }}
              >
                <div>
                  {!src && <img src={cameraIcon} alt="camera icon" width={65} height={65}></img>}

                  {src && (
                    <div
                      style={{
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                    >
                      <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} circularCrop={true} />
                    </div>
                  )}
                </div>
                {!src && (
                  <div>
                    <h5 className="font-size-5 text-black-2 ">Browse Image</h5>
                  </div>
                )}
              </div>
              {src && (
                <>
                  <button
                    onClick={handleChooseDifferentImage}
                    className="btn btn-white w-50 btn-medium  text-black-2 text-uppercase py-6 font-size-2 mt-10"
                  >
                    Upload different image
                  </button>

                  <div className="d-flex flex-row-reverse">
                    <button
                      onClick={handleUploadPhoto}
                      className="btn btn-primary btn-medium  text-white text-uppercase py-6 font-size-2"
                    >
                      {loading ? <Loader loading={loading} /> : "upload"}
                    </button>
                  </div>
                </>
              )}
            </div>
            <div />
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalUploadPhoto;

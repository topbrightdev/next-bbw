import { useState } from "react";
import Cropper from "react-image-crop";

const CropImage = ({ image }) => {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  return <Cropper src={image} crop={crop} onChange={(newCrop) => setCrop(newCrop)} circularCrop={true} />;
};

export default CropImage;

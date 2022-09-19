import React, { useRef } from "react";
import { allowedImageExtensions } from "../../utils/constants";

const ImagePicker = ({ renderButton, onChange, disabled = false }) => {
  let filePickerRef = useRef();

  const handleClick = () => filePickerRef.click();

  const handleChange = (event) => {
    const reader = new FileReader();
    reader.onload = handleSelect;
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSelect = (event) => {
    onChange(event.target.result);
  };

  return (
    <>
      <input
        className="d-none"
        ref={(inp) => (filePickerRef = inp)}
        type="file"
        accept={allowedImageExtensions.map((ext) => `image/${ext}`).join(", ")}
        onChange={handleChange}
        disabled={disabled}
      />
      {renderButton ? (
        renderButton({ handleClick })
      ) : (
        <button onClick={handleClick} className="btn btn-dark mx-4 mt-20 px-10 py-9">
          UPLOAD IMAGE
        </button>
      )}
    </>
  );
};

export default ImagePicker;

import React from "react";

function Tag(props) {
  const { children } = props;
  return (
    <span className="bg-dark-gray min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-white mt-2 d-inline-block">
      {children}
    </span>
  );
}

export default Tag;

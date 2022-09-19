import React from "react";

const Loader = ({ loading, dark }) => {
  return loading ? (
    !dark ? (
      <span className="spinner-border spinner-border-sm text-light" />
    ) : (
      <span className="spinner-border spinner-border-sm text-dark" />
    )
  ) : null;
};

export default Loader;

import React from "react";
import Link from "next/link";

import imgL1Logo from "../../assets/image/black-logo.svg";
import imgL1LogoWhite from "../../assets/image/white-logo.svg";

const Logo = ({ white, className = "", ...rest }) => {
  return (
    <Link href="/">
      <a className={`d-block ${className}`} {...rest}>
        <img src={white ? imgL1LogoWhite : imgL1Logo} alt="black-business-warehouse" height="40vh" width="auto" />
      </a>
    </Link>
  );
};

export default Logo;

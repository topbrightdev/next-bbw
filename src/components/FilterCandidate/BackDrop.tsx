import { FC } from "react";
import cx from "classnames";

interface Props {
  visible?: boolean;
  toggle?: () => void;
}

const Backdrop: FC<Props> = ({ visible = false, toggle }) => {
  const backdropClassNames = cx({
    "position-fixed top-0 left-0 h-screen w-screen transition-opacity duration-300 ease-in-out bg-black z-1000": true,
    "opacity-0 pointer-events-none": !visible,
    "opacity-50": visible,
  });
  return <div onClick={toggle} className={backdropClassNames} />;
};

export default Backdrop;

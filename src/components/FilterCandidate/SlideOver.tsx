import { FC } from "react";
import cx from "classnames";
import BackDrop from "./BackDrop";

interface Props {
  visible?: boolean;
  toggle?: () => void;
  children?: React.ReactNode;
}

const SlideOver: FC<Props> = ({ visible = false, toggle, children }) => {
  const containerClassNames = cx({
    "position-absolute h-screen w-full mx-auto transition-duration-500 top-0 right-0 ease-in-out bg-white z-2": true,
    "translate-x-full": !visible,
    "translate-x-0": visible,
  });
  return (
    <>
      <BackDrop visible={visible} toggle={toggle} />
      <div className={containerClassNames}>{children}</div>
    </>
  );
};
export default SlideOver;

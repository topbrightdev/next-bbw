import classNames from "classnames";
import Loader from "./Loader";
const Button = ({
  text,
  dark,
  small,
  medium,
  large,
  fullWidth,
  halfWidth,
  handleClick,
  disabled,
  loading,
  textUpperCase,
  logo,
  otherClass,
}) => {
  let className = classNames(
    `btn ${otherClass}`,
    { "btn-dark": dark, "btn-white": !dark },
    { "px-5 py-6": small },
    { "px-10 py-9": medium },
    { "px-15 py-10": large },
    { "w-100": fullWidth },
    { "w-50": halfWidth },
    { "text-uppercase": textUpperCase },
  );
  return (
    <button type="submit" onClick={handleClick} className={className} disabled={disabled}>
      {logo && !loading ? (
        <>
          <img src={logo} alt="logo" className="mr-2" />
        </>
      ) : null}
      {loading ? <Loader loading /> : text}
    </button>
  );
};

export default Button;

import logoSmall from "../../assets/image/l3/png/Logo-small.png";

const ContactUsSuccess = () => {
  return (
    <div className="col-sm-12">
      <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
        <img className="mb-5" src={logoSmall} alt="black-business-warehouse" height="50px" width="50px" />
        <h5 className="font-size-7 text-black-2 font-weight-bold mt-5">Success!</h5>
        <p className="font-size-4 text-black-2 mt-2">Request was sent we will contact you via email</p>
      </div>
    </div>
  );
};

export default ContactUsSuccess;

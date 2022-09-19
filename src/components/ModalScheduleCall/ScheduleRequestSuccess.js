import logoSmall from "../../assets/image/l3/png/Logo-small.png";

const ScheduleRequestSuccess = () => {
  return (
    <div className="col-sm-12">
      <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
        <img className="mb-5" src={logoSmall} alt="black-business-warehouse" height="60px" width="60px" />
        <p className="font-size-6 text-black-2 font-weight-bold mt-10">Your request has been received.</p>
        <p className="font-size-6 font-weight-semibold mt-2">We will follow up to find a time to schedule a call</p>
      </div>
    </div>
  );
};

export default ScheduleRequestSuccess;

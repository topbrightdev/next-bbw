import partnerImage from "../../assets/image/l3/png/partnerNotAuthenticated.png";

const PartnerNotAuthenticated = ({ handleScheduleCall, handleLearnMore, ...rest }) => {
  return (
    <section className="pt-10 pt-lg-5 bg-white fade-in" {...rest}>
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="pl-md-20">
            <h4 className="font-size-7 text-black-2 font-weight-bold mt-md-10">
              Get instant access to top tier contracting opportunities
            </h4>
            <p className="text-black-2 font-weight-semibold pt-3">Real contracting opportunities for black owned businesses</p>
            <div className="mt-10 mx-auto d-flex flex-nowrap">
              <button
                onClick={handleScheduleCall}
                className="btn btn-primary btn-medium w-30 rounded-5 font-size-3 text-uppercase py-lg-9"
              >
                Schedule a call
              </button>
              <button
                onClick={handleLearnMore}
                className="btn btn-white text-black-2 font-weight-semibold btn-medium w-30 rounded-5 font-size-3 text-uppercase py-lg-9 ml-2"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <img src={partnerImage} className="w-100" />
        </div>
      </div>
    </section>
  );
};

export default PartnerNotAuthenticated;

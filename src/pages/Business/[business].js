// @PACKAGES
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
//AMPLITUDE
import amplitude from "@config/amplitude";
// @COMPONENTS
import { LoggedInLayout } from "@components/Layout";
import ArticleCard from "@components/ArticlePreview/ArticleCard";
import { Loader } from "@components/Common";
import ModalBusinessInformation from "@components/ModalBusinessInformation";
//UTILS
import { BUSINESS_CONTACT_INFORMATION_VIEWED } from "@utils/events";
// @SERVICES
import { getBusinessFields } from "@services/Business";
import { getBusinessById } from "@services/Business";
// import { getUserById } from "@services/User";
import { getLinkPreview } from "@services/api-services/link-preview";
import { getProfileAvatarUrl } from "@services/Storage";
// @CONTEXT
import DataContext from "@context/DataContext";
import GlobalContext from "@context/GlobalContext";
//UTILS
import { DefaultValues } from "@utils/constants";
// @ASSETS
import suitCaseIcon from "@image/svg/suitcase.svg";
import locationIcon from "@image/svg/location.svg";

const BusinessProfile = ({ data }) => {
  //USE_STATE
  const [news, setNews] = useState([]);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [loadingArticles, setLoadingArticles] = useState(false);
  //ROUTER
  const router = useRouter();
  //CONTEXT
  const { loading, businessWithDetails, currentUser, currentUserWithDetails } = useContext(DataContext);
  const globalContext = useContext(GlobalContext);
  //OTHER

  let certifications = data.certification.filter((word) => word.length > 1);
  //EVENT_HANDLERS
  const handleLogEvent = () => {
    const { id, firstName, lastName, email } = currentUserWithDetails;
    amplitude.logEvent(BUSINESS_CONTACT_INFORMATION_VIEWED, {
      viewedBusiness: { name: data.name, id: data.id, type: data.type },
      user: {
        id: id,
        name: `${firstName} ${lastName}`,
        email: email[0].email,
        business: { name: businessWithDetails.name, id: businessWithDetails.id, type: businessWithDetails.type },
      },
      time: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    });
  };
  const handleContactUs = () => {
    handleLogEvent();
    globalContext.toggleContactUsModal();
  };
  const handleBusinessInformation = () => {
    handleLogEvent();
    globalContext.toggleBusinessInformationModal();
  };
  async function fetchArticles() {
    setLoadingArticles(true);
    try {
      const articles = (
        await Promise.all(
          data.news.map((n) =>
            n.source && n.source.trim().length ? getLinkPreview({ url: n.source, isFirst: false, isLast: false }) : null,
          ),
        )
      ).filter((article) => article);
      setNews(articles);
      setLoadingArticles(false);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchAvatar = async () => {
    const avatar = await getProfileAvatarUrl(data.mediaId, DefaultValues.BUSINESS);

    setCurrentAvatar(avatar);
  };
  //USE_EFFECT
  useEffect(() => {
    if (data.mediaId) {
      fetchAvatar();
    }
  }, [data.mediaId]);
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/");
    }
  }, [loading]);

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <LoggedInLayout backButton contactModal={true} businessEmail={data.email}>
      <ModalBusinessInformation
        id={data.id}
        type={data.type}
        city={data.city}
        state={data.state}
        email={data.email}
        phone={data.phone}
        website={data.website}
        logo={currentAvatar}
        name={data.name}
        handleContactUs={handleContactUs}
        handleLogEvent={handleLogEvent}
      />
      <div className="row">
        <div className="col-12 mb-7">
          <div className="bg-white rounded-4 pt-11 pb-11 shadow-9">
            <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
              <a className="mr-xs-7 mb-5 mb-xs-0" href={data.website} target="_blank" rel="noreferrer">
                <div className="bg-white mt-5 company-detail-container border">
                  <img src={currentAvatar} className="sideBar-company-logo object-contain" alt="black business warehouse" />
                </div>
              </a>
              <div className="d-flex p-5 w-100">
                <div className="w-50">
                  <h2 className="mt-xs-n5">
                    <a className="font-size-6 text-black-2 font-weight-semibold">{data.name} </a>
                  </h2>
                  <img alt="industry" src={suitCaseIcon} width={23} height={23} />
                  <span className="mb-0 text-black-2 font-size-4">
                    {"  "} &nbsp;
                    {data.categoryId} &nbsp;
                  </span>
                  <img alt="location" src={locationIcon} width={23} height={23} />
                  <span className="mb-0 text-black-2 font-size-4">
                    {"  "} &nbsp;
                    {data.city}, {data.state}
                  </span>
                </div>
                <div className="w-50 d-flex align-items-center justify-content-center">
                  <button
                    onClick={handleBusinessInformation}
                    role="button"
                    className="btn pointer btn-primary btn-medium w-10 rounded-5 text-center text-uppercase py-9"
                  >
                    Open Contacts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- back Button End --> */}
      <div className="row">
        {/* <!-- Middle Content --> */}
        <div className="col-12">
          <div className="bg-white rounded-4 shadow-9">
            {/* <!-- Tab Section Start --> */}

            {/* <!-- Tab Content --> */}

            {/* <!-- Excerpt Start --> */}

            <div className="pr-xl-0 pr-xxl-14 px-xs-12 pt-5">
              <h4 className="font-size-5  mt-5 text-black-2">Overview</h4>
            </div>
            <div className=" row pr-xl-0 pr-xxl-14 px-xs-12 pt-5">
              <div className="col-12 col-lg-4 col-md-4">
                <div className="mb-8 bg-concrete p-5 rounded-5">
                  <p className="font-size-4">President</p>
                  <h5 className="font-size-5 font-weight-bold text-black-2">{data.owner_name ? data.owner_name : <br />}</h5>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <div className="mb-8 bg-concrete p-5 rounded-5">
                  <p className="font-size-4">Year Founded</p>
                  <h5 className="font-size-5 font-weight-bold text-black-2">{data.yearFounded ? data.yearFounded : <br />}</h5>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-md-4">
                <div className="mb-8 bg-concrete p-5 rounded-5">
                  <p className="font-size-4">Size</p>
                  <h5 className="font-size-5 font-weight-bold text-black-2">{data.employees ? data.employees : <br />}</h5>
                </div>
              </div>
            </div>
            <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
              <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">About us</h4>
              <p className="font-size-4 mb-6">{data.description}</p>
            </div>
            {/* <!-- Excerpt End --> */}
            {/* <!-- Skills --> */}
            <div className="pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-4 pb-5">
              <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Services</h4>
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {data.subcategory.map((service, index) => (
                  <li key={index}>
                    <span className="bg-concrete min-width-px-96 mr-3 text-center rounded-8 px-6 py-1 font-weight-semibold font-size-3 text-black-2 mt-2  d-inline-block">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <!-- Skills End --> */}
            {/* <!-- Certifications Section Start --> */}
            <div className="p-5 pl-xs-12 pt-4 pb-5">
              <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Certifications</h4>
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {certifications.map((service, index) => (
                  <li key={index}>
                    <span className="bg-concrete min-width-px-96 mr-3 text-center rounded-8 font-weight-semibold px-6 py-1 font-size-3 text-black-2 mt-2 d-inline-block">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <!-- Card Section End --> */}
            {/* <!-- Card Section Start --> */}
            <div className="p-5 pl-xs-12 pt-4 pb-5">
              <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">News</h4>
              {/* <!-- Single Card --> */}

              {/* {data.news &&
                data.news.length > 0 &&
                data.news.map((article, index) => (
                  <ul key={index} className="list-unstyled mb-1 d-flex flex-wrap flex-row justify-items-center align-items-center ml-2">
                    <li>
                      <span className="mr-3">
                        <img src={iconL} alt="" />
                      </span>
                      <a className="text-denim font-size-3 mr-6 h-px-33 mt-4" href={article.source} target="_blank" rel="noreferrer">
                        {article.source}
                      </a>
                    </li>
                  </ul>
                ))} */}
              {loadingArticles && <Loader dark={true} loading={loadingArticles} />}
              <div className="row">
                {news &&
                  news.length > 0 &&
                  news.map((article) => (
                    <ArticleCard
                      key={article.url}
                      title={article?.title}
                      description={article?.description}
                      image={article?.img}
                      domain={article?.domain}
                      source={article?.url}
                    />
                  ))}
              </div>

              {/* <!-- Single Card End --> */}
            </div>
            {/* <!-- Card Section End --> */}

            {/* <!-- Tab Content End --> */}
            {/* <!-- Tab Section End --> */}
          </div>
        </div>
        {/* <!-- Footer Start --> */}
        {/* <!-- Footer Start --> */}
        {/* <!-- Left Sidebar Start --> */}

        {/* <!-- Left Sidebar End --> */}
      </div>
    </LoggedInLayout>
  );
};

export async function getServerSideProps(context) {
  //For Business Detail page
  const data = await getBusinessById(context.query.business);

  const { mediaId, phone, email, categoryId, subcategory, certification, news } = await getBusinessFields(data);
  data.mediaId = mediaId.source;
  data.phone = Array.isArray(phone) ? phone?.[0]?.phone || "" : "";
  data.email = Array.isArray(email) ? email?.[0]?.email || "" : "";
  data.categoryId = categoryId.name;
  data.subcategory = subcategory.map((subcat) => subcat.name);
  data.certification = certification.map((cert) => cert.name);
  data.news = news;

  return {
    props: {
      data,
    },
  };
}

export default BusinessProfile;

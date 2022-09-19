// import App from 'next/app'
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalContext";
import { DataProvider } from "../context/DataContext";
import { ToastContainer } from "react-toastify";
import { WEBFLOW_PATHS } from "@utils/webflow";

// const webflowPathnames = Object.keys(WEBFLOW_PATHS).map((path) => `/${path !== "/" ? path : ""}`);

/* DISABLED STYLES FOR WEBFLOW PAGES
import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf";
import "react-image-crop/dist/ReactCrop.css";
import "../assets/fonts/icon-font/fonts/avasta.ttf";
import "../assets/fonts/icon-font/css/style.css";

import "antd/dist/antd.css";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../node_modules/aos/dist/aos.css";

import "../assets/fonts/icon-font/css/style.css";
import "../assets/fonts/fontawesome-5/css/all.css";

import "../scss/bootstrap.scss";
import "../scss/main.scss";

import "react-toastify/dist/ReactToastify.css";
// */
const WithLayout = ({ Component, pageProps, pageContext }) => {
  require("../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf");
  require("../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf");
  require("../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf");
  require("react-image-crop/dist/ReactCrop.css");
  require("../assets/fonts/icon-font/fonts/avasta.ttf");
  require("../assets/fonts/icon-font/css/style.css");

  require("antd/dist/antd.css");

  require("../../node_modules/slick-carousel/slick/slick.css");
  require("../../node_modules/slick-carousel/slick/slick-theme.css");
  require("../../node_modules/aos/dist/aos.css");

  require("../assets/fonts/icon-font/css/style.css");
  require("../assets/fonts/fontawesome-5/css/all.css");

  require("../scss/bootstrap.scss");
  require("../scss/main.scss");

  require("react-toastify/dist/ReactToastify.css");
  return (
    <GlobalProvider>
      <Layout pageContext={pageContext}>
        <ToastContainer autoClose={3000} hideProgressBar closeOnClick />
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
};

const MyApp = ({ Component, pageProps, router }) => {
  let pageContext = {};
  const pathname = router.pathname;
  if (pathname.match(/404/)) pageContext = { layout: "bare" };
  else if (pathname.match(/dashboard/)) pageContext = { layout: "dashboard" };
  const isWebflow = WEBFLOW_PATHS.includes(pathname);
  return (
    <DataProvider>
      {isWebflow ? <Component {...pageProps} /> : <WithLayout Component={Component} pageProps={pageProps} pageContext={pageContext} />}
      {/* <Layout pageContext={pageContext}>
          <ToastContainer autoClose={3000} hideProgressBar closeOnClick />
          <Component {...pageProps} />
        </Layout> */}
    </DataProvider>
  );
};

export default MyApp;

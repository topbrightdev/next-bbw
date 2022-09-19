import React, { useState, useEffect, useContext, useRef } from "react";

import styled, { ThemeProvider } from "styled-components";
import Helmet from "next/head";
import AOS from "aos";

import Header from "../Header";

import SidebarDashboard from "../SidebarDashboard";
import ModalVideo from "../ModalVideo";
import ModalApplication from "../ModalApplication";
import ModalSignIn from "../ModalSignIn";
import ModalSignUp from "../ModalSignUp";
import ModalScheduleCall from "../ModalScheduleCall";

import GlobalStyle from "../../utils/globalStyle";

import imgFavicon from "../../assets/favicon.svg";

import { get, merge } from "lodash";
// the full theme object
import { theme as baseTheme } from "../../utils";
import { useRouter } from "next/router";
import GlobalContext from "./../../context/GlobalContext";
import { loggedInPaths } from "../../utils/constants";
const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 9999999999;
  opacity: 1;
  visibility: visible;
  transition: all 1s ease-out 0.5s;
  &.inActive {
    opacity: 0;
    visibility: hidden;
  }
`;

// options for different color modes
const modes = { light: "light", dark: "dark" };

// merge the color mode with the base theme
// to create a new theme object
const getTheme = (mode) =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors),
  });

const Layout = ({ children, pageContext }) => {
  const gContext = useContext(GlobalContext);
  const [visibleLoader, setVisibleLoader] = useState(true);
  const [headerShow, setHeaderShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setHeaderShow(!loggedInPaths.includes(router.pathname));
  }, [router.pathname]);

  useEffect(() => {
    AOS.init({ once: true });
    setVisibleLoader(false);
  }, []);

  // Navbar style based on scroll
  const eleRef = useRef();

  useEffect(() => {
    window.addEventListener(
      "popstate",
      function () {
        // The popstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false,
    );
    window.addEventListener(
      "pushState",
      function () {
        // The pushstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false,
    );
  }, [gContext]);

  if (pageContext.layout === "bare") {
    return (
      <ThemeProvider theme={gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)}>
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>Black Business Warehouse</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"}>
            <div className="load-circle">
              <span className="one"></span>
            </div>
          </Loader>
          <div className="site-wrapper overflow-hidden" ref={eleRef}>
            {children}
          </div>

          <ModalVideo />
          <ModalApplication />
          <ModalSignIn />
          <ModalSignUp />
          <ModalScheduleCall />
        </div>
      </ThemeProvider>
    );
  }

  if (pageContext.layout === "dashboard") {
    return (
      <ThemeProvider theme={gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)}>
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>Black Business Warehouse</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"}>
            <div className="load-circle">
              <span className="one"></span>
            </div>
          </Loader>
          <div className="site-wrapper overflow-hidden bg-default-2" ref={eleRef}>
            <Header isDark={gContext.headerDark} />
            <SidebarDashboard />
            {children}
          </div>

          <ModalVideo />
          <ModalApplication />
          <ModalSignIn />
          <ModalSignUp />
          <ModalScheduleCall />
        </div>
      </ThemeProvider>
    );
  }
  return (
    <>
      <ThemeProvider theme={gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)}>
        <div data-theme-mode-panel-active data-theme="light">
          <GlobalStyle />
          <Helmet>
            <title>Black Business Warehouse</title>
            <link rel="icon" type="image/png" href={imgFavicon} />
          </Helmet>
          <Loader id="loading" className={visibleLoader ? "" : "inActive"} />
          <div className="site-wrapper overflow-hidden" ref={eleRef}>
            {/* {headerShow ? <Header isDark={gContext.headerDark} /> : false} */}
            {headerShow ? <Header isDark={gContext.headerDark} /> : null}

            {children}
            {/* TODO: Add Footer */}
            {/* <Footer isDark={gContext.footerDark} /> */}
          </div>

          <ModalVideo />
          <ModalApplication />
          <ModalSignIn />
          <ModalSignUp />
          <ModalScheduleCall />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;

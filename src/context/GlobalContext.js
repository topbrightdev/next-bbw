import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { setCookie, destroyCookie } from "nookies";
const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false);
  const [showSidebarDashboard, setShowSidebarDashboard] = useState(true);
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [contactUsModalVisible, setContactUsModalVisible] = useState(false);
  const [uploadImageModalVisible, setUploadImageModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [scheduleCallModalVisible, setScheduleCallModal] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [candidateDetailModalVisible, setCandidateDetailModal] = useState(false);
  const [candidateFilterSlideOverVisible, setCandidateFilterSlideOverVisible] = useState(false);
  const [businessInformationModalVisible, setBusinessInformationModalVisible] = useState(false);
  const [pdfModalVisible, setPdfModal] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [visibleOffCanvas, setVisibleOffCanvas] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) setCookie("null", "userId", user.uid);
      else destroyCookie(null, "userId");
    });
  }, []);

  const [header, setHeader] = useState({
    theme: "light",
    bgClass: "default",
    variant: "primary",
    align: "left",
    isFluid: false,
    button: "cta", // profile, account, null
    buttonText: "Get started free", // profile, account, null
    reveal: true,
  });
  const [footer, setFooter] = useState({
    theme: "dark",
    style: "style1", //style1, style2
  });

  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };
  const toggleCandidateFilterSlideOver = () => {
    setCandidateFilterSlideOverVisible(!candidateFilterSlideOverVisible);
  };
  const toggleScheduleCall = () => {
    setScheduleCallModal(!scheduleCallModalVisible);
  };
  const toggleContactUsModal = () => {
    setContactUsModalVisible(!contactUsModalVisible);
  };
  const toggleBusinessInformationModal = () => {
    setBusinessInformationModalVisible(!businessInformationModalVisible);
  };
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };
  const toggleUploadImageModal = () => {
    setUploadImageModalVisible(!uploadImageModalVisible);
  };
  const toggleCandidateDetailModal = () => {
    setCandidateDetailModal(!candidateDetailModalVisible);
  };
  const togglePdfModal = () => {
    setPdfModal(!pdfModalVisible);
  };
  const toggleSidebarDashboard = () => {
    setShowSidebarDashboard(!showSidebarDashboard);
  };

  const toggleVideoModal = () => {
    setVideoModalVisible(!videoModalVisible);
  };

  const toggleApplicationModal = () => {
    setApplicationModalVisible(!applicationModalVisible);
  };

  const toggleSignInModal = () => {
    setSignInModalVisible(!signInModalVisible);
  };

  const toggleSignUpModal = () => {
    setSignUpModalVisible(!signUpModalVisible);
  };

  const toggleOffCanvas = () => {
    setVisibleOffCanvas(!visibleOffCanvas);
  };

  const closeOffCanvas = () => {
    setVisibleOffCanvas(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        uploadImageModalVisible,
        candidateFilterSlideOverVisible,
        toggleCandidateFilterSlideOver,
        businessInformationModalVisible,
        toggleBusinessInformationModal,
        pdfModalVisible,
        togglePdfModal,
        toggleUploadImageModal,
        toggleFilterModal,
        filterModalVisible,
        contactUsModalVisible,
        toggleContactUsModal,
        scheduleCallModalVisible,
        toggleScheduleCall,
        candidateDetailModalVisible,
        toggleCandidateDetailModal,
        themeDark,
        toggleTheme,
        showSidebarDashboard,
        toggleSidebarDashboard,
        videoModalVisible,
        toggleVideoModal,
        applicationModalVisible,
        toggleApplicationModal,
        signInModalVisible,
        toggleSignInModal,
        signUpModalVisible,
        toggleSignUpModal,
        visibleOffCanvas,
        toggleOffCanvas,
        closeOffCanvas,
        header,
        setHeader,
        footer,
        setFooter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };

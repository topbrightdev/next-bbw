import React from "react";

import PageWrapper from "../../components/PageWrapper";
import Hero from "../../sections/landing1/Hero";
import Brands from "../../sections/landing3/Brands";
import Services from "../../sections/landing3/Services";
import Content1 from "../../sections/landing3/Content1";
import Content2 from "../../sections/landing3/Content2";
import Footer from "../../components/Footer";

const BusinessesIndexPage = () => {
  return (
    <>
      <PageWrapper
        headerConfig={{
          bgClass: "dynamic-sticky-bg",
        }}
      >
        <Content1 businesses />
        <Content2 businesses />
        <Brands businesses />
        <Hero businesses />
        <Services businesses />
        {/* <Slider /> */}
        <Footer />
      </PageWrapper>
    </>
  );
};
export default BusinessesIndexPage;

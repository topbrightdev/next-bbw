import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import PageWrapper from "../../components/PageWrapper";
import Hero from "../../sections/landing3/Hero";
import DataContext from "../../context/DataContext";
import Loader from "../../components/Common/ScreenLoader";

const IndexPage = () => {
  const router = useRouter();
  const { currentUserWithDetails, loading } = useContext(DataContext);
  useEffect(() => {
    if (currentUserWithDetails && !loading) {
      router.push("/businesses");
    }
  }, [loading, currentUserWithDetails]);

  if (currentUserWithDetails) {
    return <Loader />;
  }

  return (
    <>
      <PageWrapper
        headerConfig={{
          bgClass: "dynamic-sticky-bg",
        }}
      >
        <Hero />
        {/* TODO: Add additonal sections for landing page */}
        {/* <Services />
          <FeaturedJobs />
          <Content1 />
          <Content2 />
          <Slider />
          <Pricing /> */}
      </PageWrapper>
    </>
  );
};
export default IndexPage;

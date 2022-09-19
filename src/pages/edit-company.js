import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

import BusinessTabs from "@components/BusinessTabs";
import PartnerTabs from "@components/PartnerTabs/PartnerTabs";
import { LoggedInLayout } from "@components/Layout";

import DataContext from "@context/DataContext";

const EditCompany = ({ type }) => {
  const router = useRouter();
  const { currentUser, loading } = useContext(DataContext);

  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/");
    }
  }, [loading]);

  return (
    <LoggedInLayout>
      <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="bg-white rounded-4 pt-5 shadow-9">{type === "BUSINESS" ? <BusinessTabs /> : <PartnerTabs />}</div>
            </div>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export async function getServerSideProps(context) {
  const { userId, BUSINESS_TYPE: type } = nookies.get(context);
  if (!userId || !type) {
    return {
      props: {},
    };
  }

  return {
    props: { type }, // will be passed to the page component as props
  };
}

export default EditCompany;

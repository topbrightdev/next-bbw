import { FC } from "react";
import PageWrapper from "@components/PageWrapper";
import Footer from "@components/Footer";

const PageWrapperContent: FC = ({ children }) => {
  return (
    <PageWrapper>
      <section className="pt-13 pt-lg-30 pb-lg-30">
        <div className="container-fluid">
          {/* <div className="row align-items-center justify-content-center"> */}
          {children}
          {/* </div> */}
        </div>
        <Footer />
      </section>
    </PageWrapper>
  );
};

export default PageWrapperContent;

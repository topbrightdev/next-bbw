import { FC, useEffect, useContext, useState } from "react";
import Link from "next/link";
import cx from "classnames";

import PageWrapper from "@components/PageWrapper";
import ModalContactUs from "@components/ModelContactUs";
import LoggedInSidebar from "@components/LoggedInSidebar";
import ProfileAvatar from "@components/ProfileAvatar";

import DataContext from "@context/DataContext";

import backButtonIcon from "@image/svg/back-button.svg";

interface BaseProps {
  backButton: boolean;
  businessEmail: string;
}

interface PropsWithRequiredEmail extends BaseProps {
  contactModal: true;
}

interface PropsWithoutRequiredEmail extends Partial<BaseProps> {
  contactModal: false;
}

type LoggedInLayoutProps = PropsWithRequiredEmail | PropsWithoutRequiredEmail;

const LoggedInLayout: FC<LoggedInLayoutProps> = ({ contactModal, businessEmail, backButton, children }) => {
  const { currentUserWithDetails } = useContext(DataContext);
  const [location, setCurrentLocation] = useState("");

  useEffect(() => {
    const location = window.location.pathname.split("/")[1];
    setCurrentLocation(location);
  }, []);
  return (
    <PageWrapper>
      {contactModal && <ModalContactUs businessEmail={businessEmail} userEmail={currentUserWithDetails?.email?.[0]?.email} />}
      <div className="bg-default ">
        <div className="row h-screen ">
          <LoggedInSidebar />
          <div className="col-10 overflow-y-scroll max-h-full">
            <div className="container">
              <div
                className={cx("d-flex align-items-center mt-5 mb-9 sticky-top pt-5 bg-white", {
                  "justify-content-between": backButton,
                  "justify-content-end": !backButton,
                })}
              >
                {backButton && (
                  <div>
                    <Link href={location === "business" ? "/businesses" : "/partners"}>
                      <a className="d-flex align-items-center ml-4">
                        <img src={backButtonIcon} alt="back_button" width={40} height={20} />
                        <span className="text-uppercase font-size-3 font-weight-bold text-black-2">Back</span>
                      </a>
                    </Link>
                  </div>
                )}
                <div>
                  <ProfileAvatar />
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoggedInLayout;

import React, { useEffect, useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { Card } from "react-bootstrap";

import PageWrapper from "../components/PageWrapper";
import LoggedInSidebar from "../components/LoggedInSidebar/LoggedInSidebar";
import ProfileAvatar from "../components/ProfileAvatar";
import UserCard from "./../components/UserCard/UserCard";
import Input from "../components/Core/Input";
import { Loader } from "../components/Common";
import ModalUserInvitation from "../components/ModalUserInvitation";

import { getBusinessById } from "../services/Business";
import { getAllUsers, getUserById } from "../services/User";
import { deleteUser, addUser, resendInvite } from "@services/api-services/user";

import DataContext from "../context/DataContext";
import GlobalContext from "../context/GlobalContext";

import { emailRegex } from "../utils/constants";
import { DefaultValues } from "@utils/constants";

const SearchGrid = ({ businessUsers, businessData, userData }) => {
  const router = useRouter();
  const { currentUser } = useContext(GlobalContext);
  const { currentUser: dcCurrentUser, loading } = useContext(DataContext);

  const inviteEmailInputRef = useRef(null);
  const [isDeleting, setDeleting] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [inviteToggle, setInviteToggle] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    success: false,
    email: "",
  });

  const [users, setUsers] = useState(businessUsers);

  useEffect(() => {
    if (!dcCurrentUser && !loading) {
      router.push("/");
    }
  }, [loading]);
  const handleUserDelete = async (userId) => {
    try {
      setDeleting(true);
      await deleteUser({ userId, ownerId: userData.id, companyId: businessData.id });
      setDeleting(false);
      const array = users.filter((user) => user.id !== userId);
      setUsers(array);
    } catch (error) {
      console.error(error);
    }
  };
  const sendInvite = async (e) => {
    const isValidEmail = emailRegex.test(invitedEmail);
    if (!isValidEmail) {
      return setEmailError("Invalid Email Address");
    } else {
      e.preventDefault();
      setLoading(true);
      try {
        const targetEmail = invitedEmail;
        const { user: newUser } = await addUser({
          targetEmail,
          senderEmail: currentUser.email,
          senderId: currentUser.uid,
          senderRole: userData.role,
          companyName: businessData.name,
          companyId: businessData.id,
        });
        setModalData({ email: targetEmail, success: true });
        setShowModal(true);
        setInvitedEmail("");
        if (inviteEmailInputRef && inviteEmailInputRef.current) inviteEmailInputRef.current.value = "";

        setUsers((userArray) => [...userArray, newUser]);
      } catch (err) {
        console.error(err);
        setModalData({ email: invitedEmail, success: false });
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendInvite = async (e, targetEmail) => {
    try {
      await resendInvite({
        targetEmail,
        senderEmail: currentUser.email,
        senderId: currentUser.uid,
        senderRole: userData.role,
        companyName: businessData.name,
        companyId: businessData.id,
      });
      setModalData({ email: targetEmail, success: true });
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setModalData({ email: invitedEmail, success: false });
      setShowModal(true);
    }
  };

  return (
    <>
      <PageWrapper>
        <div className="row h-screen">
          <LoggedInSidebar businessInformation={businessData} />
          <div className="col-sm-10 overflow-y-scroll max-h-full">
            <div className="bg-default-1 pt-1 pt-lg-5 pb-10">
              <div className="container">
                <div className="d-flex flex-row-reverse">
                  <ProfileAvatar userInformation={userData} />
                </div>
              </div>
            </div>
            <ModalUserInvitation
              show={showModal}
              toggle={() => setShowModal(false)}
              email={modalData.email}
              success={modalData.success}
            />

            <div className="bg-white pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
              <Card className="container px-0 pb-8 shadow">
                <Card.Header>
                  <h4 className="m-2">
                    <span className="text-black-2">{users.length}</span> <span className="text-gray">Users</span>
                  </h4>
                </Card.Header>
                <Card.Body>
                  {!inviteToggle ? (
                    <div className="border-bottom ">
                      <button
                        className="btn btn-primary btn-medium text-uppercase font-size-3 text-center py-5 mb-8"
                        onClick={() => setInviteToggle(true)}
                      >
                        <span className="font-size-5">+ &nbsp;</span> Invite User
                      </button>
                    </div>
                  ) : (
                    <div className="border-bottom fade-in-delay">
                      <div className="display-block text-black">
                        <label htmlFor="invite-user-email-input" className="justify-between">
                          <strong>Email</strong>&nbsp;
                          {emailError.length > 0 && (
                            <span className="text-danger">
                              <em>({emailError})</em>
                            </span>
                          )}
                        </label>
                      </div>
                      <Input
                        ref={inviteEmailInputRef}
                        id="invite-user-email-input"
                        placeholder="Email of User"
                        type="email"
                        style={{
                          backgroundColor: "white",
                          width: "40%",
                          height: 36,
                          marginBottom: 10,
                        }}
                        onChange={(e) => {
                          setEmailError("");
                          setInvitedEmail(e.target.value);
                        }}
                        defaultValue=""
                      ></Input>
                      <button
                        className="btn btn-primary btn-medium text-uppercase font-size-3 text-center py-5 my-8"
                        onClick={(e) => sendInvite(e)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader loading={isLoading} /> : "Send Invite"}
                      </button>
                    </div>
                  )}
                  {[...users]?.map((user, index) => (
                    <UserCard
                      key={index}
                      firstName={user?.firstName}
                      lastName={user?.lastName}
                      email={user?.email?.[0] || ""}
                      phone={user?.phone?.[0] || ""}
                      role={user?.role}
                      avatar={user?.mediaId}
                      occupation={user?.occupation}
                      status={user?.status || "ACTIVE"}
                      id={user?.id}
                      handleUserDelete={handleUserDelete}
                      handleResendInvite={handleResendInvite}
                      showDeleteOption={userData?.role === DefaultValues.ADMIN ? true : false}
                      isDeleting={isDeleting}
                    />
                  ))}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export async function getServerSideProps(context) {
  const { userId } = nookies.get(context);
  if (!userId) {
    return {
      props: {},
    };
  }

  const userData = await getUserById(userId);
  const businessData = await getBusinessById(userData.parentId);

  const { user } = businessData;
  const businessUsers = await getAllUsers(user);
  return {
    props: { businessUsers, businessData, userData }, // will be passed to the page component as props
  };
}

export default SearchGrid;

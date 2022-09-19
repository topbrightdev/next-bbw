import { useState, useEffect } from "react";
import { getProfileAvatarUrl } from "../../services/Storage";
import userDefaultLogo from "../../assets/image/svg/avatar-user.svg";
import { PendingUserCard } from ".";
import ActiveUserCard from "./ActiveUserCard";
import { getMediaById } from "@services/Media";
import { DefaultValues } from "@utils/constants";

const UserCard = ({
  avatar,
  firstName,
  lastName,
  role,
  email,
  phone,
  occupation,
  status,
  id,
  showDeleteOption,
  handleUserDelete,
  handleResendInvite,
  isDeleting,
}) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  const getAvatarUrl = async () => {
    const { source } = await getMediaById(avatar);
    const url = await getProfileAvatarUrl(source, DefaultValues.USER);
    setAvatarUrl(url);
  };

  useEffect(() => {
    getAvatarUrl();
  }, []);

  return status === "PENDING" ? (
    <PendingUserCard
      id={id}
      email={email}
      handleUserDelete={handleUserDelete}
      showDeleteOption={showDeleteOption}
      isDeleting={isDeleting}
      handleResendInvite={handleResendInvite}
    />
  ) : (
    <ActiveUserCard
      id={id}
      avatar={avatarUrl || userDefaultLogo}
      firstName={firstName}
      lastName={lastName}
      role={role}
      email={email}
      phone={phone}
      occupation={occupation}
      showDeleteOption={showDeleteOption}
      handleUserDelete={handleUserDelete}
      isDeleting={isDeleting}
    />
  );
};

export default UserCard;

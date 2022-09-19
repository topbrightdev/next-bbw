import userPendingLogo from "../../assets/image/svg/avatar-pending.svg";
import binIcon from "../../assets/image/svg/icon-bin.svg";
import { Loader } from "../Common";

const PendingUserCard = ({ email, handleUserDelete, id, isDeleting, showDeleteOption, handleResendInvite }) => {
  const cancelInvite = () => {
    handleUserDelete(id);
  };

  const resendInvite = (e) => {
    handleResendInvite(e, email);
  };

  return (
    <div className="row border-bottom bg-light p-8 mb-2">
      <div className="col-1">
        <img className="rounded-circle" alt="avatar" src={userPendingLogo} width="50" height="50" />
      </div>
      <div className="col-4 align-self-center">
        <span>{email}</span>
      </div>
      {showDeleteOption && (
        <div className="d-flex col-7 justify-content-end">
          <button
            className="btn btn-medium text-uppercase font-size-2 text-center mx-1 border-0 bg-transparent text-black"
            onClick={cancelInvite}
          >
            {isDeleting ? (
              <span className="mr-4">
                <Loader loading={isDeleting} dark />
              </span>
            ) : (
              <img src={binIcon} width={24} height="100%" className="mr-2" />
            )}{" "}
            <strong>Cancel</strong>
          </button>
          <button className="btn btn-primary btn-medium text-uppercase font-size-2 text-center mx-1" onClick={resendInvite}>
            Resend Invite
          </button>
        </div>
      )}
    </div>
  );
};

export default PendingUserCard;

import React from "react";
import ProfileList from "./profileList";
import ProfileDetails from "./profileDetails";

const ProfileContainer = () => {
  return (
    <div className="thx-wrapper flex">
      <div className="thx-drawer flex">
        <div className="main-title">Profile List</div>
        <ProfileList />
      </div>
      <ProfileDetails />
    </div>
  );
};

export default ProfileContainer;

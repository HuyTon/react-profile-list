import React from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  selectedProfileId: state.selectedProfileId,
});

const ProfileDetails = () => {
  const profiles = useSelector((state) => state.profiles);
  const selectedProfileId = useSelector((state) => state.selectedProfileId);

  const selectedProfile = profiles.find(
    (profile) => profile.id === selectedProfileId
  );

  return (
    <div className="thx-window">
      <div className="sub-title flex">
        <h1 id="eqTitle" className="eq-title">
          {selectedProfile.name}
        </h1>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(ProfileDetails);

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveProfileUp, moveProfileDown } from "../redux/actions";
import "../assets/css/profile.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  selectedProfileId: state.selectedProfileId,
});

const mapDispatchToProps = {
  moveProfileUp,
  moveProfileDown,
};

const Toolbars = ({ onAddCustomProfile, onEditProfile, onDeleteProfile }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles);
  const selectedProfileId = useSelector((state) => state.selectedProfileId);
  const selectedProfile = profiles.find(
    (profile) => profile.id === selectedProfileId
  );

  const onMoveUp = () => {
    dispatch(moveProfileUp(selectedProfileId));
  };

  const onMoveDown = () => {
    dispatch(moveProfileDown(selectedProfileId));
  };

  return (
    <div className="toolbar flex">
      <div
        className="icon add"
        id="profileAdd"
        onClick={onAddCustomProfile}
      ></div>
      <div
        className={`icon edit ${selectedProfile.editable ? "show" : ""}`}
        id="profileEdit"
        onClick={onEditProfile}
      ></div>
      <div
        className={`icon delete ${selectedProfile.editable ? "show" : ""}`}
        id="profileDelete"
        onClick={onDeleteProfile}
      ></div>

      <div
        className={`icon down ${
          selectedProfileId === profiles[profiles.length - 1].id
            ? "disabled"
            : ""
        }`}
        id="profileDown"
        onClick={onMoveDown}
      ></div>
      <div
        className={`icon up ${
          selectedProfileId === profiles[0].id ? "disabled" : ""
        }`}
        id="profileUp"
        onClick={onMoveUp}
      ></div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbars);

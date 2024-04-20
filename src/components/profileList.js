import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfiles,
  selectProfile,
  addCustomProfile,
  editProfile,
  deleteProfile,
} from "../redux/actions";
import "../assets/css/profile.css";
import { connect } from "react-redux";
import Toolbars from "./toolbars";

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  selectedProfileId: state.selectedProfileId,
});

const mapDispatchToProps = {
  updateProfiles,
  selectProfile,
  addCustomProfile,
  editProfile,
  deleteProfile,
};

const ProfileList = () => {
  const dispatch = useDispatch();
  const storedProfiles = useSelector((state) => state.profiles);
  const selectedProfileId = useSelector((state) => state.selectedProfileId);
  const selectedProfile = storedProfiles.find(
    (profile) => profile.id === selectedProfileId
  );

  const [profiles, setProfiles] = useState(storedProfiles);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [editTop, setEditTop] = useState(0);
  const [newName, setNewName] = useState("");
  const [keyDown, setKeyDown] = useState("");

  const inputRef = useRef(null);

  // Create a ref to hold the previous value of storedProfiles
  const prevStoredProfilesRef = useRef();

  // Load profiles from local storage on component mount
  useEffect(() => {
    const localStoredProfiles = JSON.parse(localStorage.getItem("profiles"));

    if (!localStoredProfiles) {
      // If no profiles are stored in local storage, set the default profiles
      localStorage.setItem("profiles", JSON.stringify(profiles));
    } else {
      // If profiles are stored in local storage, retrieve them
      setProfiles(localStoredProfiles); // Update local state with the retrieved profiles
      dispatch(updateProfiles(localStoredProfiles)); // Dispatch action to update Redux store with the retrieved profiles
    }
  }, []);

  // Auto-save mechanism
  useEffect(() => {
    if (prevStoredProfilesRef.current !== undefined) {
      if (storedProfiles !== prevStoredProfilesRef.current) {
        console.log("storedProfiles has changed:", storedProfiles);

        localStorage.setItem("profiles", JSON.stringify(storedProfiles));
        setProfiles(storedProfiles);
      }
    }
    // Update the previous value of storedProfiles
    prevStoredProfilesRef.current = storedProfiles;

    let saveTimeout;

    const saveData = () => {
      // Pretend API call (replace with actual API call)
      console.log("Calling Dummy API with profiles:", profiles);
    };

    const handleChange = () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(saveData, 3000); // 3 seconds timeout
    };

    window.addEventListener("storage", handleChange); // Listen for changes made in other tabs/windows

    return () => {
      window.removeEventListener("storage", handleChange);
      clearTimeout(saveTimeout);
    };
  }, [storedProfiles]);

  const toggleShowEditPopup = () => {
    setShowEditPopup(!showEditPopup);
  };

  const toggleShowDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  const onProfileClick = (profileid) => {
    dispatch(selectProfile(profileid));
  };

  const onEditProfile = () => {
    const currentEditItem = document.querySelector(`#${selectedProfileId}`);
    if (currentEditItem) {
      setEditTop(currentEditItem.offsetTop);

      inputRef.current.value = currentEditItem.textContent;

      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 100);
    }

    toggleShowEditPopup();
  };
  const onDeleteProfile = () => {
    toggleShowDeletePopup();
  };

  const onBlur = () => {
    if (!keyDown) {
      if (newName && newName.trim()) {
        onEditProfileSaveChanges();
      }
      toggleShowEditPopup();
    } else {
      setKeyDown("");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setKeyDown(e.key);

      if (newName && newName.trim()) {
        onEditProfileSaveChanges();
      }
      toggleShowEditPopup();
    }
  };

  const onEditProfileSaveChanges = () => {
    dispatch(editProfile(selectedProfileId, newName));
    setNewName("");
  };

  const onDeleteProfileSaveChanges = () => {
    dispatch(deleteProfile(selectedProfileId));
    toggleShowDeletePopup();
  };

  const onAddCustomProfile = () => {
    dispatch(addCustomProfile());
  };

  return (
    <div id="profileWrapper" className="drawer-select flex">
      <div id="profileList" className="scrollable">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            id={profile.id}
            className={`profile-item ${
              profile.id === selectedProfileId ? "active" : ""
            } ${profile.type} ${profile.editable ? "" : "no-edit"}`}
            onClick={() => onProfileClick(profile.id)}
          >
            {profile.name}
          </div>
        ))}
        <input
          id="profileRename"
          className={`profile-item ${showEditPopup ? "show" : ""}`}
          placeholder="Enter Profile Name"
          maxLength="25"
          style={{ top: editTop + "px" }}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={(e) => setNewName(e.target.value)}
          ref={inputRef}
        />
      </div>
      <Toolbars
        profiles={profiles}
        onAddCustomProfile={onAddCustomProfile}
        onEditProfile={onEditProfile}
        onDeleteProfile={onDeleteProfile}
      />
      <div
        id="profileDelCfm"
        className={`profile-del alert flex ${showDeletePopup ? "show" : ""}`}
      >
        <div className="title">delete eq</div>
        <div className="body-text t-center" id="delName">
          {selectedProfile ? selectedProfile.name : ""}
        </div>
        <div
          className="thx-btn"
          id="cfmDelete"
          onClick={onDeleteProfileSaveChanges}
        >
          delete
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);

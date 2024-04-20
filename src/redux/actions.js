export const ActionTypes = {
  UPDATE_PROFILES: "UPDATE_PROFILES",
  SELECT_PROFILE: "SELECT_PROFILE",
  MOVE_PROFILE_UP: "MOVE_PROFILE_UP",
  MOVE_PROFILE_DOWN: "MOVE_PROFILE_DOWN",
  ADD_CUSTOM_PROFILE: "ADD_CUSTOM_PROFILE",
  EDIT_PROFILE: "EDIT_PROFILE",
  DELETE_PROFILE: "DELETE_PROFILE",
};

export const updateProfiles = (profiles) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_PROFILES,
      payload: profiles,
    });
  };
};

export const selectProfile = (profileId) => ({
  type: ActionTypes.SELECT_PROFILE,
  payload: profileId,
});

export const moveProfileUp = (profileId) => ({
  type: ActionTypes.MOVE_PROFILE_UP,
  payload: profileId,
});

export const moveProfileDown = (profileId) => ({
  type: ActionTypes.MOVE_PROFILE_DOWN,
  payload: profileId,
});

export const addCustomProfile = () => ({
  type: ActionTypes.ADD_CUSTOM_PROFILE,
});

export const editProfile = (profileId, newName) => ({
  type: ActionTypes.EDIT_PROFILE,
  payload: { id: profileId, newName },
});

export const deleteProfile = (profileId) => ({
  type: ActionTypes.DELETE_PROFILE,
  payload: profileId,
});

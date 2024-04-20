import { ActionTypes } from "./actions";

const initialState = {
  profiles: [
    {
      id: "profile1",
      name: "Default",
      type: "default",
      editable: false,
    },
    {
      id: "profile2",
      name: "Game",
      type: "game",
      editable: false,
    },
    {
      id: "profile3",
      name: "Movie",
      type: "movie",
      editable: false,
    },
    {
      id: "profile4",
      name: "Music",
      type: "music",
      editable: false,
    },
    // {
    //   id: "custom1",
    //   name: "Custom 1",
    //   type: "custom",
    //   editable: true,
    // },
    // {
    //   id: "custom2",
    //   name: "Demo Long Text Demo Long",
    //   type: "custom",
    //   editable: true,
    // },
  ],
  selectedProfileId: "profile1",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    case ActionTypes.SELECT_PROFILE:
      return {
        ...state,
        selectedProfileId: action.payload,
      };
    case ActionTypes.MOVE_PROFILE_UP:
      const profileIndexUp = state.profiles.findIndex(
        (profile) => profile.id === action.payload
      );

      if (profileIndexUp > 0) {
        const updatedProfilesUp = [...state.profiles];
        const temp = updatedProfilesUp[profileIndexUp];
        updatedProfilesUp[profileIndexUp] =
          updatedProfilesUp[profileIndexUp - 1];
        updatedProfilesUp[profileIndexUp - 1] = temp;

        return { ...state, profiles: updatedProfilesUp };
      }
      return state;
    case ActionTypes.MOVE_PROFILE_DOWN:
      const profileIndexDown = state.profiles.findIndex(
        (profile) => profile.id === action.payload
      );

      if (profileIndexDown < state.profiles.length - 1) {
        const updatedProfilesDown = [...state.profiles];
        const temp = updatedProfilesDown[profileIndexDown];
        updatedProfilesDown[profileIndexDown] =
          updatedProfilesDown[profileIndexDown + 1];
        updatedProfilesDown[profileIndexDown + 1] = temp;

        return { ...state, profiles: updatedProfilesDown };
      }
      return state;
    case ActionTypes.ADD_CUSTOM_PROFILE:
      const newProfileId = `custom${state.profiles.length + 1}`;
      const newProfile = {
        id: newProfileId,
        name: "New Profile",
        type: "custom",
        editable: true,
      };
      return {
        ...state,
        profiles: [...state.profiles, newProfile],
        selectedProfileId: newProfileId,
      };
    case ActionTypes.EDIT_PROFILE:
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile.id === action.payload.id
            ? { ...profile, name: action.payload.newName }
            : profile
        ),
      };
    case ActionTypes.DELETE_PROFILE:
      const index = state.profiles.findIndex(
        (profile) => profile.id === action.payload
      );
      const updatedProfiles = state.profiles.filter(
        (profile) => profile.id !== action.payload
      );

      const newSelectedProfileId =
        index === updatedProfiles.length
          ? updatedProfiles[updatedProfiles.length - 1].id
          : updatedProfiles[index - 1].id;

      return {
        ...state,
        profiles: updatedProfiles,
        selectedProfileId: newSelectedProfileId,
      };
    default:
      return state;
  }
};

export default profileReducer;

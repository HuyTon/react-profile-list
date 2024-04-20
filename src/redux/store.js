import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducers";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: profileReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

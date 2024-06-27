import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from "./FetchSlice";

const store = configureStore({
  reducer: {
    images: fetchReducer,
  },
});

export default store;

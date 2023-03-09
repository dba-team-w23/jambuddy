import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import jamReducer from "../features/postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    jam: jamReducer,
  },
});

export { store };

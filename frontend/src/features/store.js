import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import jamReducer from "../features/postSlice";
import postReducer from "../features/postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // post: postReducer,
    jam: jamReducer,
  },
});

export { store };

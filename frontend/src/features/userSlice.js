import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isSignedIn: false,
  },
  reducers: {
    setSignedIn: (state, action) => {
      console.log("setting signed in");
      state.isSignedIn = action.payload;
    },
    setUserProfile: (state, action) => {
      state.user = action.payload;
      console.log("slice state.user", state.user);
    },
    clearUserProfile: (state, action) => {
      console.log("clearing user profile");
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      console.log("updating user profile");
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { setUserProfile, clearUserProfile, setSignedIn } =
  userSlice.actions;
export { userSlice };
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

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
      console.log("setting user profile");
      state.user = action.payload;
    },
    clearUserProfile: (state, action) => {
      console.log("clearing user profile");
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {},
});

// console.log(userSlice.actions.clearUserProfile);

export const { setUserProfile, clearUserProfile, setSignedIn } =
  userSlice.actions;
export { userSlice };
export default userSlice.reducer;

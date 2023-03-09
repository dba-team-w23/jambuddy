import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL =
  "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfavejamreqs";

const jamSlice = createSlice({
  name: "jam",
  initialState: {
    likedJams: [],
  },
  reducers: {
    toggleLikedJam: (state, action) => {
      console.log("jamSlice state", state.likedJams);
      console.log("jamSlice action.payload", action.payload);
      const { jamId, userId } = action.payload;
      const index = state.likedJams.indexOf(jamId);
      const updatedLikedJams =
        index === -1
          ? [...state.likedJams, jamId]
          : state.likedJams.filter((id) => id !== jamId);
      return { ...state, likedJams: updatedLikedJams };
    },
  },
});

export const { toggleLikedJam } = jamSlice.actions;
export default jamSlice.reducer;

// await axios.delete(`${baseURL}`, {
//   data: { profileid: userId, jrid: jamId },
// });
// await axios.post(`${baseURL}`, {
//   data: { profileid: userId, jrid: jamId },
// });

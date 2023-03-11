import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const baseURL =
  "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfavejamreqs";

export const fetchLikedJams = createAsyncThunk(
  "jam/fetchLikedJams",
  async (userId) => {
    const response = await axios.get(`${baseURL}/${userId}`);
    console.log("response data", response.data);
    return response.jamrequest_ids;
  }
);

const jamSlice = createSlice({
  name: "jam",
  initialState: {
    likedJams: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addLikedJam: (state, action) => {
      state.likedJams.push(action.payload);
    },
    toggleLikedJam: (state, action) => {
      const { jamId, userId } = action.payload;
      const index = state.likedJams.indexOf(jamId);
      const updatedLikedJams =
        index === -1
          ? [...state.likedJams, jamId]
          : state.likedJams.filter((id) => id !== jamId);
      state.likedJams = updatedLikedJams;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedJams.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLikedJams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likedJams = action.payload;
      })
      .addCase(fetchLikedJams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleLikedJam, addLikedJam } = jamSlice.actions;
export default jamSlice.reducer;

// await axios.delete(`${baseURL}`, {
//   data: { profileid: userId, jrid: jamId },
// });
// await axios.post(`${baseURL}`, {
//   data: { profileid: userId, jrid: jamId },
// });

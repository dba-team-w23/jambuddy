import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 2,
    last_login: "2023-02-26T22:01:08.378477Z",
    date_joined: "2023-02-23T06:56:13.398356Z",
    username: "swally",
    first_name: "Bret",
    last_name: "Bret",
    email: "fakeemail@email.com",
    street: "370 Maple St",
    street2: null,
    city: "Plainville",
    state: "UT",
    zipcode: "84123",
    phone: "801-801-8001",
    photo:
      "https://st.depositphotos.com/1269204/2716/i/450/depositphotos_27167511-stock-photo-smiling-middle-aged-man.jpg",
    note: "Decent guy, excited to graduate!",
    instruments: null,
    genres: null,
    exp_level: null,
  },
  reducers: {
    clearUserProfile: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: {},
});

console.log(userSlice.actions.clearUserProfile);

export const { clearUserProfile } = userSlice.actions;

export { userSlice };

export default userSlice.reducer;

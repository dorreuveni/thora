import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  gotUsers: false,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setGotUsers: (state, action) => {
      state.gotUsers = action.payload;
    },
  },
});

export const { setUsers, setGotUsers } = UserSlice.actions;

export default UserSlice.reducer;

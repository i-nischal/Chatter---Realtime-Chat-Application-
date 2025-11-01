import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    allUsers: null,
    isLoading: true,
    isAuthenticated: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserData, clearUserData, setLoading, setAllUsers } =
  userSlice.actions;
export default userSlice.reducer;

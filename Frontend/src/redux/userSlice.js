import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isLoading: true, // Start with true
    isAuthenticated: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
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

export const { setUserData, clearUserData, setLoading } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { authState } from "./initialState";

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.user = {};
      localStorage.removeItem("userInfo");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

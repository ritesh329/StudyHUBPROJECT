import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logoutAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;

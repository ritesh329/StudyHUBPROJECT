// hooks/loginAdmin.js
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../redux/admin/adminSlice";

export const loginAdmin = (loginData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const res = await axios.post(
      "https://studyhubapi-e2lb.onrender.com/api/auth/admin-login",
      loginData,
      { withCredentials: true } // ✅ cookie receive
    );

    localStorage.setItem("token", res.data.token); // ✅ token store

    dispatch(
      loginSuccess({
        admin: res.data.data,   // ✅ backend ka adminData
        token: res.data.token,  // ✅ backend se aa raha token
      })
    );

  } catch (error) {
    dispatch(
      loginFail(
        error?.response?.data?.message ||
        error.message ||
        "Admin login failed"
      )
    );
  }
};

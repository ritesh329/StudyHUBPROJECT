import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/UserSlice";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const res = await axios.post(
      "https://studyhubapi-e2lb.onrender.com/api/auth/user-login",
      loginData,
      { withCredentials: true } 
    );
        
      localStorage.setItem("token", res.data.token);
    dispatch(
      loginSuccess({
        user: res.data.user,   // backend user object
        token: res.data.token, // backend token (optional use)
      })
    );

  } catch (error) {
    dispatch(
      loginFailure(
        error?.response?.data?.message ||
        error.message ||
        "Login failed"
      )
    );
  }
};

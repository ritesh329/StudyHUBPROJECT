import { jwtDecode } from "jwt-decode"; // ✅ CORRECT


export const getToken = () => {
  return localStorage.getItem("token");
};

export const getDecodedToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token); // { id, role, iat, exp }
  } catch {
    return null;
  }
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const isAdmin = () => {
  const decoded = getDecodedToken();
  return decoded?.role === "admin";
};

export const isUser = () => {
  const decoded = getDecodedToken();
  return decoded?.role === "user";
};
export const getUserId = () => {
  const decoded = getDecodedToken();
  return decoded?.id || null;
};

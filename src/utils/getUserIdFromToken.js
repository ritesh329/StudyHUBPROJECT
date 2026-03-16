// utils/getUserIdFromToken.js
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1]; // JWT payload
    const decoded = JSON.parse(atob(payload)); // base64 decode
    return decoded.id || null;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};

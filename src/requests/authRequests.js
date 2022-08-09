import axios from "axios";

export const loginRequest = (loginInput) => {
  return axios.post("/api/auth/login", loginInput);
};
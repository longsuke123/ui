import { AUTH } from "./constants";

export const login = ({ username, password }) => ({
  type: AUTH.AUTH_LOGIN,
  username,
  password
});

export const loginSuccess = (data) => ({
  type: AUTH.AUTH_LOGIN_SUCCESS,
  data,
});



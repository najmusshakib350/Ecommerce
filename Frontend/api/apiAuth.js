import axios from "axios";
//import { API } from "../utils/config";

export const register = (user) => {
  return axios.post(`${process.env.REACT_APP_API_URL}user/signup`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const UploadMyPhoto = (token, user) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}user/updateMe`, user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = (user) => {
  return axios.post(`${process.env.REACT_APP_API_URL}user/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//Findout one user
export const OneUser = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}user/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

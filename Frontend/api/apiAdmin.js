//import { API } from "../utils/config";
import axios from "axios";

export const createCategory = (token, data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}category/create`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProduct = (token, data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}product/create`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategories = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}category`);
};

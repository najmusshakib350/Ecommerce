//import { API } from "../utils/config";
import axios from "axios";

export const getProducts = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}product`);
};

export const getProductDetails = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}product/${id}`);
};

export const getCategories = () => {
  return axios.get(`${process.env.API}category`);
};

export const createReview = (token, rating, product, user, review) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}reviews/create`,
    { rating, product, user, review },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const UpdateProduct = (id, quantity) => {
  const qty = quantity - 1;
  return axios.patch(
    `${process.env.REACT_APP_API_URL}product/${id}`,
    { quantity: qty },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const UpdateProductIncrease = (id, quantity) => {
  const qty = quantity + 1;
  return axios.patch(
    `${process.env.REACT_APP_API_URL}product/${id}`,
    { quantity: qty },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const UpdateProductIncreaseAddAllRemove = (id, quantity, count) => {
  const qty = quantity + count;
  return axios.patch(
    `${process.env.REACT_APP_API_URL}product/${id}`,
    { quantity: qty },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const findYourProduct = (id, token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}payment/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductDetailsPurchase = async (id) => {
  window.product = [];
  let product = await axios.get(
    `${process.env.REACT_APP_API_URL}product/${id}`
  );
  window.product.push(product.data.data.doc);
  return window.product;
};

import axios from "axios";
//import { API } from "../utils/config";

export const addToCart = (token, cartItem) => {
  return axios.post(`${process.env.REACT_APP_API_URL}cart`, cartItem, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartItems = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCartItems = (token, cartItem) => {
  return axios.put(`${process.env.REACT_APP_API_URL}cart`, cartItem, {
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCartItem = (token, cartItem) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}cart/${cartItem._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//deleteallcartitems for specifig user
export const deleteCartItemsAll = (token) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}delete/cart/all/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const getProfile = token => {
//     return axios.get(`${API}profile`, {
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     })
// }

// // export const updateProfile = (token, data) => {
// //     return axios.post(`${API}profile`, data, {
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Authorization": `Bearer ${token}`
// //         }
// //     })
// // }

export const initPayment = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}payment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

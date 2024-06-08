import axios from "axios";
//import { API } from "../utils/config";

export const checkOutSession = async (id, token, email) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}payment/checkout-session/`,
    { id: id, email: email },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const GuestcheckOutSession = async (data) => {

  return axios.post(
    `${process.env.REACT_APP_API_URL}payment/checkout-session/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

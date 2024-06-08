import axios from "axios";
export const emailCreate = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}email/create`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//import { API } from "../utils/config";
import axios from "axios";

export const getReviewDetails = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}reviews/user/${id}`);
};
//Get all reviews
export const getAllReviews = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}reviews/`);
};

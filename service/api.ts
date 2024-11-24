import axios from "axios";

const BASE_URL =
  "http://ec2-54-206-187-225.ap-southeast-2.compute.amazonaws.com:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const apiNonToken = axios.create({
  baseURL: BASE_URL,
});

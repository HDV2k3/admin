import axios from "axios";

const BASE_URL =
  "http://ec2-52-63-184-223.ap-southeast-2.compute.amazonaws.com:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

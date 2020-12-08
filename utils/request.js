import axios from "axios";
import { apiEndPoints } from "../constants/apiEndPoints";
import { axiosInstance } from "./interceptor";

export const Requests = {
  post: (path, body) => axiosInstance.post(`${apiEndPoints.baseUrl}${path}`, body),
  put: (path, body) => axiosInstance.put(`${apiEndPoints.baseUrl}${path}`, body),
  delete: (path, params) =>
    axiosInstance.delete(`${apiEndPoints.baseUrl}${path}`, {
      params: params,
    }),
  get: (path, params, auth) =>
    axiosInstance.get(`${apiEndPoints.baseUrl}${path}`, {
      params: params,
      auth: auth,
    }),
};

import axios from "axios";
import store from "../store/index";

const apiClient = axios.create({
  baseURL: "https://api.summit2020.pre-stage.cc",
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use(function(config) {
  config.headers["Authorization"] = `Bearer ${store.getters.token}`;
  return config;
});

apiClient.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return error.response;
  }
);

const responseHandler = {
  "200": res => res.data,
  "400": () => Promise.reject("輸入錯誤，請重新確認"),
  "500": () => Promise.reject("抱歉，伺服器發生錯誤，請稍候再嘗試")
};

export default {
  async GET(path, data) {
    const response = await apiClient.get(path, data);
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  },
  async POST(path, data) {
    const response = await apiClient.post(path, data);
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  },
  async PUT(path, data) {
    const response = await apiClient.put(path, data);
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  },
  async DELETE(path, data) {
    const response = await apiClient.delete(path, { data: data });
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  }
};

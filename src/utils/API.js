import axios from "axios";
// import store from "../store/index";

const TOKEN_STORAGE_KEY = "summit-auth-token";

const apiClient = axios.create({
  baseURL: "https://api.summit2020.pre-stage.cc",
  headers: {
    "Content-Type": "application/json"
  }
});

const currentToken = localStorage.getItem(TOKEN_STORAGE_KEY);

if (currentToken) {
  setAuthToken(currentToken);
}

apiClient.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return error.response;
  }
);

function hasAuthToken() {
  return !!apiClient.defaults.headers.common.Authorization;
}

function setAuthToken(authToken) {
  apiClient.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
}

function resetAuthToken() {
  const common = apiClient.defaults.headers.common;
  if (common.Authorization) {
    delete common.Authorization;
    localStorage.setItem(TOKEN_STORAGE_KEY, "");
  }
}

const responseHandler = {
  "200": res => res.data,
  "400": () => Promise.reject("輸入錯誤，請重新確認"),
  "500": () => Promise.reject("抱歉，伺服器發生錯誤，請稍候再嘗試")
};

export default {
  HAS_AUTH_TOKEN: hasAuthToken,
  SET_AUTH_TOKEN: setAuthToken,
  RESET_AUTH_TOKEN: resetAuthToken,
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
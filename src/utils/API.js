import { createAxiosWrapper } from "./apiUtils";
// import store from "../store/index";

const TOKEN_STORAGE_KEY = "summit-auth-token";

const baseURL = location.href.includes("propose.summit2020.g0v.tw")
  ? `https://api.summit2020.g0v.tw`
  : `https://api.summit2020.g0v.tw`;
// https://api.summit2020.pre-stage.cc

const { apiClient, apis } = createAxiosWrapper(baseURL);

function getExistingAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
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

export default {
  GET_EXISTING_AUTH_TOKEN: getExistingAuthToken,
  SET_AUTH_TOKEN: setAuthToken,
  RESET_AUTH_TOKEN: resetAuthToken,
  ...apis
};

import { createAxiosWrapper } from "./apiUtils";

const baseURL = location.href.includes("propose.summit2020.g0v.tw")
  ? `https://discuss.summit2020.g0v.tw`
  : `https://discuss.summit2020.pre-stage.cc`;

const { apis } = createAxiosWrapper(baseURL);

export default apis;

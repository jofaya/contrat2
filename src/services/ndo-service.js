import authHeader from "./auth-header";
import axios from "axios";

const baseUrl = "https://10.50.101.240/api/v1/schemas";

const getDmz = () => {
  return axios.get(baseUrl + "5f17d9e91000002330584937", { authHeader });
};

const getBaseNetwork = () => {
  return axios.get(baseUrl + "5d9861440e00003a00d02af2", { authHeader });
};

const getPP01Network = () => {
  return axios.get(baseUrl + "5fbb93e4110000a013d41da8", { authHeader });
};

const getProdNetwork = () => {
  return axios.get(baseUrl + "5fbba286110000fd16d41da9", { authHeader });
};
const getGlobalNetwork = () => {
  return axios.get(baseUrl + "628205fd390000e0d03a32a2", { authHeader });
};

export default {
  getDmz,
  getBaseNetwork,
  getGlobalNetwork,
  getPP01Network,
  getProdNetwork,
};

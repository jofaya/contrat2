import axios from "axios";
import authHeader from "./auth-header";

const baseUrl = "http://localhost:7000/api/class/";

//https://10.50.101.101//api/class/ soloy anty n io baseUrl ambony io;

const baseUrlNdo = "http://localhost:7000/api/v1/schemas/";

//https://10.50.101.240/api/v1/schemas/ ity baseUrl an NDO

const getFvTenants = () => {
  return axios.get(baseUrl + "fvTenant.json", {
    headers: authHeader(),
  });
};

const getServeurs = () => {
  return axios.get(baseUrl + "compHv.json", { headers: authHeader() });
};

const getBridgeDomains = () => {
  return axios.get(baseUrl + "fvBD.json", { headers: authHeader() });
};

const getContrats = () => {
  return axios.get(baseUrl + "vzBrCP.json", { headers: authHeader() });
};

const getHosts = () => {
  return axios.get(baseUrl + "fvCEp.json", { headers: authHeader() });
};

const getAppProfiles = () => {
  return axios.get(baseUrl + "fvAp.json", { headers: authHeader() });
};

const getEpgs = () => {
  return axios.get(baseUrl, "fvAEPg.json", { headers: authHeader() });
};

const getDmz = () => {
  return axios.get(baseUrlNdo, "5fbba286110000fd16d41da9", { headers: authHeader() });
};

const getBaseNetwork = () => {
  return axios.get(baseUrlNdo, "5d9861440e00003a00d02af2", { headers: authHeader() });
};

const getGlobalNetwork = () => {
  return axios.get(baseUrlNdo, "628205fd390000e0d03a32a2", { headers: authHeader() });
};

const getPpNetwork = () => {
  return axios.get(baseUrlNdo, "5fbb93e4110000a013d41da8", { headers: authHeader() });
};

const getProdNetwork = () => {
  return axios.get(baseUrlNdo, "5fbba286110000fd16d41da9", { headers: authHeader() });
};
export default {
  getFvTenants,
  getAppProfiles,
  getBridgeDomains,
  getContrats,
  getEpgs,
  getHosts,
  getServeurs,
  getDmz,
  getBaseNetwork,
  getGlobalNetwork,
  getPpNetwork,
  getProdNetwork,
};

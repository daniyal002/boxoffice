import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
axios.defaults.baseURL = "http://localhost:3030";
if (token) {
  axios.defaults.headers = {
    Authorization: `${token}`,
  };
}

const getAllCashe = async () => {
  return axios.get("/cahes/getAllCashes").then((response) => response.data);
};

const getCasheById = async (body) => {
  return axios
    .post("/cahes/getCasheById", { id: body })
    .then((response) => response.data);
};

const createCashe = async (body) => {
  return axios
    .post("/cahes/createCashe", body)
    .then((response) => response.data);
};

const updateCashe = async (body) => {
  return axios
    .put("/cahes/updateCashe", body)
    .then((response) => response.data);
};

const deleteCashe = async (casheId) => {
  return axios
    .post("/cahes/deleteCashe", { id: casheId })
    .then((response) => response.data);
};

export { getAllCashe, getCasheById, createCashe, updateCashe, deleteCashe };

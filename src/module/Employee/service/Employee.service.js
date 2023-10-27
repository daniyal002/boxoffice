import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
axios.defaults.baseURL = "http://localhost:3030";
if (token) {
  axios.defaults.headers = {
    Authorization: `${token}`,
  };
}

const getAllEmployee = async () => {
  return axios
    .get("/employee/getAllEmployees")
    .then((response) => response.data);
};

const getEmployeeById = async (body) => {
  return axios
    .post("/employee/getEmployeeById", { id: body })
    .then((response) => response.data);
};

const createEmployee = async (body) => {
  return axios
    .post("/employee/createEmployee", body)
    .then((response) => response.data);
};

const updateEmployee = async (body) => {
  return axios
    .put("/employee/updateEmployee", body)
    .then((response) => response.data);
};

const deleteEmployee = async (EmployeeId) => {
  return axios
    .post("/employee/deleteEmployee", { id: EmployeeId })
    .then((response) => response.data);
};

export {
  getAllEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

import axios from "axios";
// import Cookies from "js-cookie";

// const token = Cookies.get("token");
axios.defaults.baseURL = "http://192.168.30.217:3030";
// if (token) {
//   axios.defaults.headers = {
//     Authorization: `${token}`,
//   };
// }

const getAllEmployee = async (token) => {
  return axios
    .get("/employee/getAllEmployees", { headers: { Authorization: token } })
    .then((response) => response.data);
};

const getEmployeeById = async (body, token) => {
  return axios
    .post(
      "/employee/getEmployeeById",
      { id: body },
      { headers: { Authorization: token } }
    )
    .then((response) => response.data);
};

const createEmployee = async (body, token) => {
  return axios
    .post("/employee/createEmployee", body, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);
};

const updateEmployee = async (body, token) => {
  return axios
    .put("/employee/updateEmployee", body, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);
};

const deleteEmployee = async (EmployeeId, token) => {
  return axios
    .post(
      "/employee/deleteEmployee",
      { id: EmployeeId },
      { headers: { Authorization: token } }
    )
    .then((response) => response.data);
};

export {
  getAllEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

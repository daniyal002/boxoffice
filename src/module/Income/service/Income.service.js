import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
axios.defaults.baseURL = "http://localhost:3030";
if (token) {
  axios.defaults.headers = {
    Authorization: `${token}`,
  };
}

const getAllIncome = async () => {
  return axios.get("/income/getAllIncomes").then((response) => response.data);
};

const getIncomeById = async (body) => {
  return axios
    .post("/income/getIncomeById", { id: body })
    .then((response) => response.data);
};

const createIncome = async (body) => {
  return axios
    .post("/income/createIncome", {
      cash_id: body.cashe_id,
      amount: parseInt(body.amount),
      employee_id: body.employee_id,
      timestamp: body.timestamp,
    })
    .then((response) => response.data);
};

const updateIncome = async (body) => {
  return axios
    .put("/income/updateIncome", body)
    .then((response) => response.data);
};

const deleteIncome = async (IncomeId) => {
  return axios
    .post("/income/deleteIncome", { id: IncomeId })
    .then((response) => response.data);
};

export {
  getAllIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};

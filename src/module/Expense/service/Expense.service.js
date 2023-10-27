import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
axios.defaults.baseURL = "http://localhost:3030";
if (token) {
  axios.defaults.headers = {
    Authorization: `${token}`,
  };
}

const getAllExpense = async () => {
  return axios.get("/expense/getAllExpenses").then((response) => response.data);
};

const getExpenseById = async (body) => {
  return axios
    .post("/expense/getExpenseById", { id: body })
    .then((response) => response.data);
};

const createExpense = async (body) => {
  const formData = new FormData();
  formData.append("cash_id", body.cash_id);
  formData.append("amount", parseInt(body.amount));
  formData.append("employee_id", body.employee_id);
  formData.append("timestamp", body.timestamp);
  formData.append("reason", body.reason);
  formData.append("status", body.status);

  // Добавьте файл к FormData
  formData.append("files", body.files);
  console.log(formData.get("timestamp"));

  return axios
    .post("/expense/createExpense", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

const spendFromCash = async (body) => {
  return axios.post("/expense/spendFromCash", body);
};

const updateExpense = async (body) => {
  return axios
    .put("/expense/updateExpense", body)
    .then((response) => response.data);
};

const updateExpenseStatus = async (body) => {
  return axios
    .put("/expense/updateExpenseStatus", body)
    .then((response) => response.data);
};

const deleteExpense = async (ExpenseId) => {
  return axios
    .post("/expense/deleteExpense", { id: ExpenseId })
    .then((response) => response.data);
};

export {
  getAllExpense,
  getExpenseById,
  createExpense,
  spendFromCash,
  updateExpense,
  updateExpenseStatus,
  deleteExpense,
};

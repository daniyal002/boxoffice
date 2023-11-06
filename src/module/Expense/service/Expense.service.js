import axios from "axios";

axios.defaults.baseURL = "http://192.168.30.217:3030";

const getAllExpense = async (token) => {
  return axios
    .get("/expense/getAllExpenses", { headers: { Authorization: token } })
    .then((response) => response.data);
};

const getExpenseById = async (body, token) => {
  return axios
    .post(
      "/expense/getExpenseById",
      { id: body },
      { headers: { Authorization: token } }
    )
    .then((response) => response.data);
};

const createExpense = async (body, token) => {
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
        Authorization: token,
      },
    })
    .then((response) => response.data);
};

const spendFromCash = async (body, token) => {
  return axios.post("/expense/spendFromCash", body, {
    headers: { Authorization: token },
  });
};

const updateExpense = async (body, token) => {
  return axios
    .put("/expense/updateExpense", body, { headers: { Authorization: token } })
    .then((response) => response.data);
};

const updateExpenseStatus = async (body, token) => {
  return axios
    .put("/expense/updateExpenseStatus", body, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);
};

const deleteExpense = async (ExpenseId, token) => {
  return axios
    .post(
      "/expense/deleteExpense",
      { id: ExpenseId },
      { headers: { Authorization: token } }
    )
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

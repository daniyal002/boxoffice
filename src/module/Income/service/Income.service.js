import axios from 'axios';
import { BASE_URL } from '../../../../env';

axios.defaults.baseURL = BASE_URL;

// if (token) {
//   axios.defaults.headers = {
//     Authorization: `${token}`,
//   };
// }

const getAllIncome = async (token) => {
  return axios
    .get('/income/getAllIncomes', { headers: { Authorization: token } })
    .then((response) => response.data);
};

const getIncomeById = async (body, token) => {
  return axios
    .post(
      '/income/getIncomeById',
      { id: body },
      { headers: { Authorization: token } }
    )
    .then((response) => response.data);
};

const createIncome = async (body, token) => {
  return axios
    .post(
      '/income/createIncome',
      {
        cash_id: body.cashe_id,
        amount: parseInt(body.amount),
        employee_id: body.employee_id,
        timestamp: body.timestamp,
      },
      { headers: { Authorization: token } }
    )
    .then((response) => response.data);
};

const updateIncome = async (body, token) => {
  return axios
    .put('/income/updateIncome', body, { headers: { Authorization: token } })
    .then((response) => response.data);
};

const deleteIncome = async (IncomeId, token) => {
  return axios
    .post(
      '/income/deleteIncome',
      { id: IncomeId },
      { headers: { Authorization: token } }
    )
    .then((response) => response.data);
};

export {
  getAllIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};

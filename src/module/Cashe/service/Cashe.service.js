import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../../../env';

const token = Cookies.get('token');

axios.defaults.baseURL = BASE_URL;

const getAllCashe = async (token) => {
  return axios
    .get('/cahes/getAllCashes', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data);
};

const getCasheById = async (body, token) => {
  return axios
    .post(
      '/cahes/getCasheById',
      { id: body },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => response.data);
};

const createCashe = async (body, token) => {
  return axios
    .post('/cahes/createCashe', body, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data);
};

const updateCashe = async (body, token) => {
  return axios
    .put('/cahes/updateCashe', body, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data);
};

const deleteCashe = async (casheId, token) => {
  return axios
    .post(
      '/cahes/deleteCashe',
      { id: casheId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => response.data);
};

export { getAllCashe, getCasheById, createCashe, updateCashe, deleteCashe };

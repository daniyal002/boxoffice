import axios from 'axios';
import { BASE_URL } from '../../env';

axios.defaults.baseURL = BASE_URL;

const resetBalance = async (token) => {
  return axios
    .post('/expense/resetBalance', { headers: { Authorization: token } })
    .then((response) => response.data);
};

export { resetBalance };

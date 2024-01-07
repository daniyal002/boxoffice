import axios from 'axios';
import { BASE_URL } from '../../../../env';

axios.defaults.baseURL = BASE_URL;

const reg = (body) => {
  return axios.post('/user/register', body).then((response) => response.data);
};

export default reg;

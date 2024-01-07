import axios from 'axios';
import { BASE_URL } from '../../../../env';

axios.defaults.baseURL = BASE_URL;
const Auth = async (body) => {
  return axios.post('/user/login', body).then((response) => response.data);
};

export default Auth;

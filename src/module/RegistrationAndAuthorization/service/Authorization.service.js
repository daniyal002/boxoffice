import axios from "axios";

const Auth = async (body) => {
  return axios
    .post("http://192.168.30.217:3030/user/login", body)
    .then((response) => response.data);
};

export default Auth;

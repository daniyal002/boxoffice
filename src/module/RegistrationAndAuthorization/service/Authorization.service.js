import axios from "axios";

const Auth = async (body) => {
  return axios
    .post("http://localhost:3030/user/login", body)
    .then((response) => response.data);
};

export default Auth;

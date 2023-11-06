import axios from "axios";

const reg = (body) => {
  return axios
    .post("http://192.168.30.217:3030/user/register", body)
    .then((response) => response.data);
};

export default reg;

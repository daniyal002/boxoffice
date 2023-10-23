import axios from "axios";

const reg = (body) => {
  axios
    .post("http:localhost:3030/user/register", body)
    .then((response) => response.data);
};

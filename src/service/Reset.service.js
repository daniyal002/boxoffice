import axios from "axios";

axios.defaults.baseURL = "http://192.168.30.217:3030";

const resetBalance = async (token) => {
  return axios
    .post("/expense/resetBalance", { headers: { Authorization: token } })
    .then((response) => response.data);
};

export { resetBalance };

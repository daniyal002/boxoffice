import Cookies from "js-cookie";

const getAuthToken = () => {
  const token = Cookies.get("token");
  return token ? `${token}` : "";
};

export default getAuthToken;

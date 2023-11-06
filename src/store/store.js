import Cookies from "js-cookie";
import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: Cookies.get("token"),

  setToken: (token) => {
    set({ token });
    Cookies.set("token", token);
  },

  getToken: () => token,

  clearToken: () => {
    set({ token: null });
    Cookies.remove("token");
  },
}));

export default useTokenStore;

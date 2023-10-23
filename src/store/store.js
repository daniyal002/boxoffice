import Cookies from "js-cookie";
import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: Cookies.get("token"),
  employee_id: Cookies.get("employee_id"),
  role: Cookies.get("role"),

  setToken: (token) => {
    set({ token });
    Cookies.set("token", token);
  },
  setEmployeeId: (employee_id) => {
    set({ employee_id });
    Cookies.set("employee_id", employee_id);
  },

  setRole: (role) => {
    set({ role });
    Cookies.set("role", role);
  },

  getToken: () => token,
  getEmployeeId: () => employee_id,
  getRole: () => role,

  clearToken: () => set({ token: null }),
  clearEmployeeId: () => set({ employee_id: null }),
  clearRole: () => set({ role: null }),
}));

export default useTokenStore;

import React from "react";
import { Navigate } from "react-router-dom";
import useTokenStore from "../store/store";

const PrivateRoute = ({ children }) => {
  const { token } = useTokenStore();

  // Проверка наличия токена (предположим, что вы сохраняете токен в localStorage)
  if (!token) {
    // Если токен отсутствует, перенаправляем на страницу входа
    return <Navigate to="/auth/login" />;
  }
  // Если токен есть, отображаем дочерний компонент
  return children;
};

export default PrivateRoute;

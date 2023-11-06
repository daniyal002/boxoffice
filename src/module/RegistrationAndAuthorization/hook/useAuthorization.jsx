import { useMutation } from "@tanstack/react-query";
import Auth from "../service/Authorization.service";
import { useState } from "react";
import useTokenStore from "../../../store/store";
import { useNavigate } from "react-router-dom";

const useAuthorization = () => {
  const { setToken } = useTokenStore();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { mutate } = useMutation(["authorization"], (body) => Auth(body), {
    onSuccess: (data) => {
      console.log(data);
      setToken(data.token);
      setError();
      navigate("/");
    },
    onError: (error) => {
      setError(error.response.data.message);
    },
  });

  return { mutate, error };
};

export { useAuthorization };

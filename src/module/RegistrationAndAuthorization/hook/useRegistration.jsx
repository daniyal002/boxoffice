import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import reg from "../service/Registration.service";

const useRegistration = () => {
  const [error, setError] = useState("");
  const { mutate, data } = useMutation(["registration"], (body) => reg(body), {
    onSuccess: () => {
      setError();
    },
    onError: (error) => {
      setError(error.response?.data?.message);
      console.log(error);
    },
  });

  return { mutate, error, data };
};

export { useRegistration };

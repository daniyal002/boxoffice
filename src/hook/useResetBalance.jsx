import { useState } from "react";
import getAuthToken from "../helper/getAuthToken";
import { resetBalance } from "../service/Reset.service";
import { useMutation } from "@tanstack/react-query";

const useResetBalance = () => {
  const [err, setErr] = useState();
  const { mutate } = useMutation(
    ["resetBalance"],
    () => resetBalance(getAuthToken()),
    {
      onSuccess: () => {
        setErr();
        alert("Все кассы обнуленны");
      },
      onError: (error) => {
        setErr(error);
      },
    }
  );

  return { mutate, err };
};

export { useResetBalance };

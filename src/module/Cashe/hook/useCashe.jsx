import { useState } from "react";
import {
  createCashe,
  deleteCashe,
  getAllCashe,
  getCasheById,
  updateCashe,
} from "../service/Cashe.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetAllCashes = () => {
  const { data, isError, isLoading } = useQuery(["getAllCashes"], () =>
    getAllCashe()
  );
  return { data, isError, isLoading };
};

const useGetCasheById = () => {
  const [err, setErr] = useState();
  const { data, isLoading, mutate } = useMutation(
    ["getCasheById"],
    (body) => getCasheById(body),
    {
      onSuccess: () => {
        setErr();
      },
      onError: (error) => {
        setErr(error.response?.data?.message);
      },
    }
  );
  return { err, data, mutate, isLoading };
};

const useCreateCashe = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllCashes");
    queryClient.invalidateQueries("getCasheById");
  };

  const [err, setErr] = useState();
  const { mutate } = useMutation(["createCashe"], (body) => createCashe(body), {
    onSuccess: () => {
      refreshData();
      setErr();
    },
    onError: (error) => {
      setErr(error.response?.data?.Message);
    },
  });

  return { err, mutate };
};

const useUpdateCashe = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllCashes");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["updateCashe"],
    (body) => updateCashe(body),
    {
      onSuccess: () => {
        refreshData();
        setErr();
      },
      onError: (error) => {
        setErr(error.response?.data?.message);
      },
    }
  );
  return { err, mutate, isLoading };
};

const useDeleteCashe = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllCashes");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["deleteCashe"],
    (casheId) => deleteCashe(casheId),
    {
      onSuccess: () => {
        refreshData();
        setErr();
      },
      onError: (error) => {
        setErr(error.response?.data?.message);
      },
    }
  );
  return { err, mutate, isLoading };
};

export {
  useGetAllCashes,
  useGetCasheById,
  useCreateCashe,
  useUpdateCashe,
  useDeleteCashe,
};

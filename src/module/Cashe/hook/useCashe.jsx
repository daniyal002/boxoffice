import { useState } from "react";
import {
  createCashe,
  deleteCashe,
  getAllCashe,
  getCasheById,
  updateCashe,
} from "../service/Cashe.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import getAuthToken from "../../../helper/getAuthToken";

const useGetAllCashes = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery(
    ["getAllCashes"],
    () => getAllCashe(getAuthToken()),
    {
      onSuccess: () => {},
      onError: (error) => {
        if (error.response.status) {
          navigate("/auth/login");
        }
      },
    }
  );
  return { data, isError, isLoading };
};

const useGetCasheById = () => {
  const [err, setErr] = useState();
  const { data, isLoading, mutate } = useMutation(
    ["getCasheById"],
    (body) => getCasheById(body, getAuthToken()),
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
  const { mutate } = useMutation(
    ["createCashe"],
    (body) => createCashe(body, getAuthToken()),
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
    (body) => updateCashe(body, getAuthToken()),
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
    (casheId) => deleteCashe(casheId, getAuthToken()),
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

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIncome,
  deleteIncome,
  getAllIncome,
  getIncomeById,
  updateIncome,
} from "../service/Income.service";

const useGetAllIncomes = () => {
  const { data, isError, isLoading } = useQuery(["getAllIncomes"], () =>
    getAllIncome()
  );
  return { data, isError, isLoading };
};

const useGetIncomeById = () => {
  const [err, setErr] = useState();
  const { data, isLoading, mutate } = useMutation(
    ["getIncomeById"],
    (body) => getIncomeById(body),
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

const useCreateIncome = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllIncomes");
    queryClient.invalidateQueries("getIncomeById");
  };

  const [err, setErr] = useState();
  const { mutate } = useMutation(
    ["createIncome"],
    (body) => createIncome(body),
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

const useUpdateIncome = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllIncomes");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["updateIncome"],
    (body) => updateIncome(body),
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

const useDeleteIncome = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllIncomes");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["deleteIncome"],
    (IncomeId) => deleteIncome(IncomeId),
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
  useGetAllIncomes,
  useGetIncomeById,
  useCreateIncome,
  useUpdateIncome,
  useDeleteIncome,
};

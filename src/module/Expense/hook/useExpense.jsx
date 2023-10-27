import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createExpense,
  deleteExpense,
  getAllExpense,
  getExpenseById,
  spendFromCash,
  updateExpense,
  updateExpenseStatus,
} from "../service/Expense.service";

const useGetAllExpenses = () => {
  const { data, isError, isLoading } = useQuery(["getAllExpenses"], () =>
    getAllExpense()
  );

  return { data, isError, isLoading };
};

const useGetExpenseById = () => {
  const [err, setErr] = useState();
  const { data, isLoading, mutate } = useMutation(
    ["getExpenseById"],
    (body) => getExpenseById(body),
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

const useCreateExpense = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllExpenses");
    queryClient.invalidateQueries("getExpenseById");
  };

  const [err, setErr] = useState();
  const { mutate } = useMutation(
    ["createExpense"],
    (body) => createExpense(body),
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

const useSpendFromCash = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllExpenses");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["spendFromCash"],
    (body) => spendFromCash(body),
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

const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllExpenses");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["updateExpense"],
    (body) => updateExpense(body),
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

const useUpdateExpenseStatus = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllExpenses");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["updateExpenseStatus"],
    (body) => updateExpenseStatus(body),
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

const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllExpenses");
  };
  const [err, setErr] = useState();
  const { mutate, isLoading } = useMutation(
    ["deleteExpense"],
    (ExpenseId) => deleteExpense(ExpenseId),
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
  useGetAllExpenses,
  useGetExpenseById,
  useCreateExpense,
  useSpendFromCash,
  useUpdateExpense,
  useUpdateExpenseStatus,
  useDeleteExpense,
};

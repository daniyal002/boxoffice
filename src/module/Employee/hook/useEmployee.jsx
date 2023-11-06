import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  updateEmployee,
} from "../service/Employee.service";
import getAuthToken from "../../../helper/getAuthToken";
import { useState } from "react";

const useGetAllEmployee = () => {
  const { data, isError, isLoading } = useQuery(["getAllEmployee"], () =>
    getAllEmployee(getAuthToken())
  );
  return { data, isError, isLoading };
};

const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllEmployee");
  };

  const [err, setErr] = useState();
  const { mutate } = useMutation(
    ["createEmployee"],
    (body) => createEmployee(body, getAuthToken()),
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

  return { mutate, err };
};

const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllEmployee");
  };

  const [err, setErr] = useState();
  const { mutate } = useMutation(
    ["updateEmployee"],
    (body) => updateEmployee(body, getAuthToken()),
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

  return { mutate, err };
};

const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries("getAllEmployee");
  };

  const [err, setErr] = useState();
  const { mutate } = useMutation(
    ["deleteEmployee"],
    (employeeId) => deleteEmployee(employeeId, getAuthToken()),
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

  return { mutate, err };
};

export {
  useGetAllEmployee,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
};

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEmployee } from "../service/Employee.service";

const useGetAllEmployee = () => {
  const { data, isError, isLoading } = useQuery(["getAllEmployee"], () =>
    getAllEmployee()
  );
  return { data, isError, isLoading };
};

export { useGetAllEmployee };

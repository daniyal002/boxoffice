import React, { useEffect, useState } from "react";
import {
  useGetAllExpenses,
  useUpdateExpenseStatus,
} from "../../hook/useExpense";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const WaitingExpense = () => {
  const { mutate } = useUpdateExpenseStatus();
  const { data } = useGetAllExpenses();
  const [arrayExpense, setArrayExpense] = useState([]);

  const updateStatus = (id, status) => {
    const body = {
      id: id,
      status: status,
    };
    console.log(body);
    mutate(body);
  };

  useEffect(() => {
    if (data) {
      const pendingExpenses = data.filter(
        (expense) => expense.status === "На согласовании"
      );
      console.log(data);
      setArrayExpense(pendingExpenses);
    }
  }, [data]);
  return (
    <>
      <h1>Заявки на согласовании</h1>
      <TableContainer
        component={Paper}
        sx={{ margin: "0 auto", maxWidth: "1000px", overflowX: "auto" }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#e0e0e0",
            }}
          >
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Касса</TableCell>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Основание</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayExpense &&
              arrayExpense.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>{expense.cashes.name}</TableCell>
                  <TableCell>{expense.employee.full_name}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.reason}</TableCell>
                  <TableCell>{expense.timestamp}</TableCell>
                  <TableCell>{expense.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => updateStatus(expense.id, "Согласовано")}
                    >
                      Согласовать
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => updateStatus(expense.id, "Отколонено")}
                    >
                      Отклонить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WaitingExpense;

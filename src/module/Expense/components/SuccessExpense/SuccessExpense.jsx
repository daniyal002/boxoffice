import React, { useEffect, useState } from "react";
import {
  useGetAllExpenses,
  useSpendFromCash,
  useUpdateExpenseStatus,
} from "../../hook/useExpense";
import {
  Alert,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const SuccessExpense = () => {
  const { mutate } = useUpdateExpenseStatus();
  const { data } = useGetAllExpenses();
  const [arrayExpense, setArrayExpense] = useState([]);

  const { mutate: spendFromCash, err } = useSpendFromCash();

  const expenseCash = (cash_id, amount) => {
    const body = {
      cash_id: cash_id,
      amount: amount,
    };
    console.log(body);
    spendFromCash(body);
  };

  useEffect(() => {}, [err]);

  const updateStatus = (id, status) => {
    const body = {
      id: id,
      status: status,
    };
    mutate(body);
  };

  useEffect(() => {
    if (data) {
      const pendingExpenses = data.filter(
        (expense) => expense.status === "Согласовано"
      );
      console.log(data);
      setArrayExpense(pendingExpenses);
    }
  }, [data]);
  return (
    <>
      <h1>Согласованные заявки</h1>
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
                  <TableCell>{expense.amount}₽</TableCell>
                  <TableCell>{expense.reason}</TableCell>
                  <TableCell>{expense.timestamp}</TableCell>
                  <TableCell>{expense.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        updateStatus(expense.id, "Выдано");
                        expenseCash(expense.cash_id, expense.amount);
                      }}
                    >
                      Выдать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {err && (
        <Alert
          severity="error"
          sx={{
            justifyContent: "center",
          }}
        >
          {err}
        </Alert>
      )}
    </>
  );
};

export default SuccessExpense;

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
import RUpdateExpense from "./UpdateExpense/RUpdateExpense";

const CanselExpense = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState();
  const [selectedCashId, setSelectedCashId] = useState();
  const [selectedAmount, setSelectedAmount] = useState();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();
  const [selectedTimestamp, setSelectedTimestamp] = useState();
  const [selectedReason, setSelectedReason] = useState();

  const handleOpenUpdate = (
    id,
    cash_id,
    employee_id,
    amount,
    timestamp,
    reason
  ) => {
    setOpenUpdate(true);
    setSelectedIncomeId(id);
    setSelectedCashId(cash_id);
    setSelectedEmployeeId(employee_id);
    setSelectedAmount(amount);
    setSelectedReason(reason);
    setSelectedTimestamp(timestamp);
  };
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
        (expense) => expense.status === "Отколонено"
      );
      console.log(data);
      setArrayExpense(pendingExpenses);
    }
  }, [data]);
  return (
    <>
      <RUpdateExpense
        open={openUpdate}
        setOpen={setOpenUpdate}
        incomeId={selectedIncomeId}
        selectedCashId={selectedCashId}
        selectedAmount={selectedAmount}
        selectedEmployeeId={selectedEmployeeId}
        selectedTimestamp={selectedTimestamp}
        selectedReason={selectedReason}
      />
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
                      onClick={() =>
                        updateStatus(expense.id, "На согласовании")
                      }
                    >
                      Повтор
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleOpenUpdate(
                          expense.id,
                          expense.cash_id,
                          expense.employee_id,
                          expense.amount,
                          expense.timestamp,
                          expense.reason
                        )
                      }
                    >
                      Редактировать
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

export default CanselExpense;

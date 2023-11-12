import React, { useEffect, useState } from "react";
import {
  useGetAllExpenses,
  useSpendFromCash,
  useUpdateExpenseStatus,
} from "../../hook/useExpense";
import {
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import OpenImage from "../OpenImage/OpenImage";

const SuccessExpense = () => {
  const { mutate } = useUpdateExpenseStatus();
  const { data } = useGetAllExpenses();
  const [arrayExpense, setArrayExpense] = useState([]);

  const { mutate: spendFromCash, err } = useSpendFromCash();

  useEffect(() => {
    if (data) {
      const pendingExpenses = data.filter(
        (expense) => expense.status === "Согласовано"
      );
      console.log(data);
      setArrayExpense(pendingExpenses);
    }
  }, [data]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);

  const handleOpen = (url) => {
    setOpen(true);
    setUrl(url);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сбросьте страницу на первую при изменении количества строк на странице
  };

  // Пересчитываем отображаемые данные на основе page и rowsPerPage
  const indexOfLastRow = (page + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  let displayedData = [];

  if (data) {
    displayedData = data
      .filter((expense) => expense.status === "Согласовано")
      .slice() // Клонируем данные, чтобы избежать изменения исходного массива
      .slice(indexOfFirstRow, indexOfLastRow);
  }

  const expenseCash = (cash_id, amount) => {
    const body = {
      cash_id: cash_id,
      amount: amount,
    };
    console.log(body);
    spendFromCash(body);
  };

  const updateStatus = (id, status) => {
    const body = {
      id: id,
      status: status,
    };
    mutate(body);
  };

  return (
    <>
      <OpenImage open={open} setOpen={setOpen} url={url} />
      <Typography
        variant="h4"
        sx={{
          color: "green",
          textAlign: "center",
          margin: "10px auto",
        }}
      >
        Согласованные заявки
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ margin: "0 auto", maxWidth: "1200px", overflowX: "auto" }}
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
              <TableCell>Сумма</TableCell>
              <TableCell>Сумма в кассе</TableCell>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Основание</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Скан</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData &&
              displayedData.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.registerNumber}</TableCell>
                  <TableCell>{expense.cashes.name}</TableCell>
                  <TableCell>{expense.amount}₽</TableCell>
                  <TableCell>{expense.cashes.balance}₽</TableCell>
                  <TableCell>{expense.employee.full_name}</TableCell>
                  <TableCell>{expense.reason}</TableCell>
                  <TableCell>{expense.timestamp}</TableCell>
                  <TableCell>
                    <img
                      src={`http://192.168.30.217:3030/${expense.imagePaths[0]}`}
                      alt={expense.imagePaths[0]}
                      width={100}
                      onClick={() => handleOpen(expense.imagePaths[0])} // Открывайте окно при клике
                      style={{ cursor: "pointer" }} // Стиль указывающий на кликабельность
                    />
                  </TableCell>
                  <TableCell>{expense.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        updateStatus(expense.id, "Выдано");
                        expenseCash(expense.cash_id, expense.amount);
                      }}
                      fullWidth
                    >
                      Выдать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {arrayExpense && (
          <TablePagination
            component="div"
            count={arrayExpense ? arrayExpense.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // Добавьте page и rowsPerPageOptions как указано ниже
            rowsPerPageOptions={[5, 10, 25, 50]} // Это настройки количества строк на странице
          />
        )}
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

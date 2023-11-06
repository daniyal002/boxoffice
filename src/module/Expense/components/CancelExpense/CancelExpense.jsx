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
  TablePagination,
  TableRow,
} from "@mui/material";
import RUpdateExpense from "./UpdateExpense/RUpdateExpense";
import OpenImage from "../OpenImage/OpenImage";

const CanselExpense = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState();
  const [selectedCashId, setSelectedCashId] = useState();
  const [selectedAmount, setSelectedAmount] = useState();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();
  const [selectedTimestamp, setSelectedTimestamp] = useState();
  const [selectedReason, setSelectedReason] = useState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Количество строк на странице

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
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);

  const handleOpen = (url) => {
    setOpen(true);
    setUrl(url);
  };

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
      .filter((expense) => expense.status === "Отколонено")
      .slice() // Клонируем данные, чтобы избежать изменения исходного массива
      .slice(indexOfFirstRow, indexOfLastRow);
  }
  return (
    <>
      <OpenImage open={open} setOpen={setOpen} url={url} />
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
              <TableCell>Скан</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData &&
              displayedData.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>{expense.cashes.name}</TableCell>
                  <TableCell>{expense.employee.full_name}</TableCell>
                  <TableCell>{expense.amount}₽</TableCell>
                  <TableCell>{expense.reason}</TableCell>
                  <TableCell>{expense.timestamp}</TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:3030/${expense.imagePaths[0]}`}
                      alt={expense.imagePaths[0]}
                      width={100}
                      onClick={() => handleOpen(expense.imagePaths[0])} // Открывайте окно при клике
                      style={{ cursor: "pointer" }} // Стиль указывающий на кликабельность
                    />
                  </TableCell>
                  <TableCell>{expense.status}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        updateStatus(expense.id, "На согласовании")
                      }
                      fullWidth
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
                      fullWidth
                    >
                      Редактировать
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
    </>
  );
};

export default CanselExpense;

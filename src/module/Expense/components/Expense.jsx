import { useDeleteExpense, useGetAllExpenses } from "../hook/useExpense";
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
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import OpenImage from "./OpenImage/OpenImage";

const Expense = () => {
  const { data } = useGetAllExpenses();
  console.log(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Количество строк на странице
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
      .slice() // Клонируем данные, чтобы избежать изменения исходного массива
      .slice(indexOfFirstRow, indexOfLastRow);
  }

  const { mutate: deleteExpense } = useDeleteExpense();
  const handelDeleteExpense = (expenseId) => {
    deleteExpense(expenseId);
  };

  return (
    <>
      <OpenImage open={open} setOpen={setOpen} url={url} />
      <h1>Все заявки</h1>
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
                <>
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
                    <TableCell>
                      <Button
                        variant="contained"
                        color={"error"}
                        onClick={() => handelDeleteExpense(expense.id)}
                        fullWidth
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
        {data && (
          <TablePagination
            component="div"
            count={data ? data.length : 0}
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

export default Expense;

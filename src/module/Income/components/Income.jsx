import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import CreateIncome from "./CreateIncome/CreateIncome";
import { useDeleteIncome, useGetAllIncomes } from "../hook/useIncome";
import UpdateIncome from "./UpdateIncome/UpdateIncome";
import TablePagination from "@mui/material/TablePagination";

const Income = () => {
  const { data } = useGetAllIncomes();
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState();
  const [selctCashId, setSelctCashId] = useState();
  const [selctAmount, setSelctAmount] = useState();
  const [selctEmployeeId, setSelctEmployeeId] = useState();
  const [selectedTimestamp, setSelectedTimestamp] = useState();

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleOpenUpdate = (id, cash_id, amount, employee_id, timestamp) => {
    setOpenUpdate(true);
    setSelectedIncomeId(id);
    setSelctCashId(cash_id);
    setSelctAmount(amount);
    setSelctEmployeeId(employee_id);
    setSelectedTimestamp(timestamp);
  };

  const { mutate: deleteIncome } = useDeleteIncome();

  const handelDeleteIncome = (incomeId) => {
    deleteIncome(incomeId);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Количество строк на странице

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сбросьте страницу на первую при изменении количества строк на странице
  };
  const indexOfLastRow = (page + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let displayedData;
  if (data) {
    displayedData = data.slice(indexOfFirstRow, indexOfLastRow);
  }
  return (
    <div>
      <Button
        onClick={handleOpenCreate}
        color="success"
        variant="contained"
        sx={{
          margin: "20px",
        }}
      >
        Создать Приход
      </Button>
      <CreateIncome open={openCreate} setOpen={setOpenCreate} />
      <UpdateIncome
        open={openUpdate}
        setOpen={setOpenUpdate}
        incomeId={selectedIncomeId}
        selctCashId={selctCashId}
        selctAmount={selctAmount}
        selctEmployeeId={selctEmployeeId}
        selectedTimestamp={selectedTimestamp}
      />
      <TableContainer
        component={Paper}
        sx={{ margin: "0 auto", maxWidth: "800px", overflowX: "auto" }}
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
              <TableCell>Инициатор</TableCell>
              <TableCell>Время прихода</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData &&
              displayedData.map((income) => (
                <TableRow key={income.id}>
                  <TableCell>{income.id}</TableCell>
                  <TableCell>{income.cashes.name}</TableCell>
                  <TableCell>{income.amount}₽</TableCell>
                  <TableCell>{income.employee.full_name}</TableCell>
                  <TableCell>{income.timestamp}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleOpenUpdate(
                          income.id,
                          income.cash_id,
                          income.amount,
                          income.employee_id,
                          income.timestamp
                        );
                      }}
                      fullWidth
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handelDeleteIncome(income.id)}
                      fullWidth
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
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
    </div>
  );
};

export default Income;

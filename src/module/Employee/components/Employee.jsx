import React, { useState } from "react";
import { useDeleteEmployee, useGetAllEmployee } from "../hook/useEmployee";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import CreateEmployee from "./CreateEmployee/CreateEmployee";
import UpdateEmployee from "./UpdateEmployee/UpdateEmployee";

const Employee = () => {
  const [fullName, setFullName] = useState("");
  const [employeeId, setemployeeId] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Количество строк на странице
  const { data } = useGetAllEmployee();
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenUpdate = (id, name) => {
    setOpenUpdate(true);
    setemployeeId(id);
    setFullName(name);
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

  const { mutate: deleteEmployee } = useDeleteEmployee();
  const handelDeleteExpense = (employeeId) => {
    deleteEmployee(employeeId);
  };

  return (
    <div>
      <Grid>
        <CreateEmployee open={openCreate} setOpen={setOpenCreate} />
        <UpdateEmployee
          open={openUpdate}
          setOpen={setOpenUpdate}
          employeeId={employeeId}
          fullName={fullName}
        />

        <Button
          onClick={handleOpenCreate}
          color="success"
          variant="contained"
          sx={{
            margin: "20px",
          }}
        >
          Создать сотрудника
        </Button>

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
                <TableCell>ФИО</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData &&
                displayedData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.full_name}</TableCell>
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
                        onClick={() =>
                          handleOpenUpdate(employee.id, employee.full_name)
                        }
                        fullWidth
                      >
                        Изменить
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handelDeleteExpense(employee.id)}
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
      </Grid>
    </div>
  );
};

export default Employee;

import React, { useEffect, useState } from "react";
import { useGetAllCashes } from "../hook/useCashe";
import CreateCashe from "./CreateCashe/CreateCashe";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import UpdateCashe from "./UpdateCashe/UpdateCashe";
import TablePagination from "@mui/material/TablePagination";
import useTokenStore from "../../../store/store";
import { useResetBalance } from "../../../hook/useResetBalance";

const Cashe = () => {
  const [casheId, setCasheId] = useState();
  const [casheName, setCasheName] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Количество строк на странице
  const { data } = useGetAllCashes();
  const [openCreate, setOpenCreate] = useState(false);
  const { token } = useTokenStore();
  const { mutate: resetBalance } = useResetBalance();

  const resetBalaceTheCashe = () => {
    resetBalance();
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenUpdate = (id, name) => {
    setOpenUpdate(true);
    setCasheId(id);
    setCasheName(name);
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
  let mainCahse = [];

  if (data) {
    displayedData = data
      .filter((income) => income.id !== 1)
      .slice() // Клонируем данные, чтобы избежать изменения исходного массива
      .slice(indexOfFirstRow, indexOfLastRow);

    mainCahse = data.filter((income) => income.id === 1);
  }

  return (
    <div>
      {token && (
        <Grid>
          <CreateCashe open={openCreate} setOpen={setOpenCreate} />
          <UpdateCashe
            open={openUpdate}
            setOpen={setOpenUpdate}
            casheId={casheId}
            casheName={casheName}
          />
          <Button
            onClick={handleOpenCreate}
            color="success"
            variant="contained"
            sx={{
              margin: "20px",
            }}
          >
            Создать кассу
          </Button>
          <Button
            onClick={resetBalaceTheCashe}
            color="error"
            variant="contained"
            sx={{
              margin: "20px",
            }}
          >
            Обнулить кассы
          </Button>
          <Grid>
            {mainCahse.map((cahse) => (
              <>
                <Alert
                  severity="success"
                  sx={{
                    justifyContent: "center",
                    fontSize: "32px",
                  }}
                >
                  Общий баланс касс: {cahse.balance}₽
                </Alert>
              </>
            ))}
          </Grid>
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
                  <TableCell>Касса</TableCell>
                  <TableCell>Баланс</TableCell>
                  <TableCell>Действие</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData &&
                  displayedData.map((cashe) => (
                    <TableRow key={cashe.name}>
                      <TableCell>{cashe.name}</TableCell>
                      <TableCell>{cashe.balance}₽</TableCell>
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
                          onClick={() => handleOpenUpdate(cashe.id, cashe.name)}
                          fullWidth
                        >
                          Изменить
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onDelete(cashe)}
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
      )}
    </div>
  );
};

export default Cashe;

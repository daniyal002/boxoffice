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
} from "@mui/material";
import UpdateCashe from "./UpdateCashe/UpdateCashe";

const Cashe = () => {
  const [casheId, setCasheId] = useState();
  const [casheName, setCasheName] = useState();

  const { data } = useGetAllCashes();

  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenUpdate = (id, name) => {
    setOpenUpdate(true);
    setCasheId(id);
    setCasheName(name);
  };
  let totalBalance;
  if (data) {
    totalBalance = data.reduce((total, cashe) => total + cashe.balance, 0);
  }
  return (
    <div>
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
              {data &&
                data.map((cashe) => (
                  <TableRow key={cashe.name}>
                    <TableCell>{cashe.name}</TableCell>
                    <TableCell>{cashe.balance}₽</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenUpdate(cashe.id, cashe.name)}
                      >
                        Изменить
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onDelete(cashe)}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "750px",
            margin: "20px auto",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "#e0e0e0",
          }}
        >
          Общая Сумма: {totalBalance}₽
        </Typography>
      </Grid>
    </div>
  );
};

export default Cashe;

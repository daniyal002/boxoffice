import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateIncome } from "../../hook/useIncome";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useGetAllCashes } from "../../../Cashe/hook/useCashe";
import { useGetAllEmployee } from "../../../Employee/hook/useEmployee";

const CreateIncome = ({ open, setOpen }) => {
  const { data: cashes } = useGetAllCashes();
  const { data: employees } = useGetAllEmployee();

  const { register, handleSubmit } = useForm();
  const { mutate, err } = useCreateIncome();

  const handleClose = () => {
    setOpen(false);
  };

  const createIncome = (body) => {
    mutate(body);
    if (body.cashe_id != "1") {
      mutate({ ...body, cashe_id: "1" });
    }
    handleClose();
    console.log(body);
  };

  const [cash, setCash] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleChangeCash = (event) => {
    setCash(event.target.value);
  };

  const handleEmployeeSelect = (event) => {
    setEmployeeId(event.target.value); // Обновите employee_id при выборе значения
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "80%",
          justifyContent: "center",
          rowGap: "10px",
          backgroundColor: "white",
          width: "300px",
          margin: "0 auto",
          borderRadius: "8px",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(createIncome)}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Касса</InputLabel>
                  <Select
                    {...register("cashe_id")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cash}
                    label="Касса"
                    onChange={handleChangeCash}
                  >
                    {cashes &&
                      cashes.map((cashe) => (
                        <MenuItem value={cashe.id} key={cashe.id}>
                          {cashe.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <TextField
                  type="number"
                  {...register("amount")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">₽</InputAdornment>
                    ),
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="Employee-simple-select-label">
                    Кассир
                  </InputLabel>
                  <Select
                    {...register("employee_id")}
                    labelId="Employee-simple-select-label"
                    id="Employee-simple-select"
                    value={employeeId} // Используйте значение employeeId
                    label="Кассир"
                    onChange={handleEmployeeSelect} // Обновляйте employeeId при изменении
                  >
                    {employees &&
                      employees.map((employee) => (
                        <MenuItem value={employee.id} key={employee.id}>
                          {employee.full_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <TextField type="datetime-local" {...register("timestamp")} />
              </Grid>

              <Grid>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "blueviolet",
                    color: "white",
                    ":hover": {
                      backgroundColor: "blueviolet",
                    },
                    border: 0,
                  }}
                  fullWidth
                >
                  Создать приход
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    ":hover": {
                      backgroundColor: "red",
                    },
                    border: 0,
                  }}
                  fullWidth
                >
                  Закрыть
                </Button>
              </Grid>
              {err && (
                <Grid
                  xs={12}
                  sx={{
                    textAlign: "center",
                    bgcolor: "red",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  <p>{err}</p>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CreateIncome;

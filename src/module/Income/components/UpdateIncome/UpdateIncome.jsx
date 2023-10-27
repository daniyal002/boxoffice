import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateIncome } from "../../hook/useIncome";
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

const UpdateIncome = ({
  open,
  setOpen,
  incomeId,
  selctCashId,
  selctAmount,
  selctEmployeeId,
  selectedTimestamp,
}) => {
  const [updatedAmount, setUpdatedAmount] = useState(selctAmount);
  const [updatedTimestamp, setUpdatedTimestamp] = useState();

  useEffect(() => {
    // Используйте объект для установки значения "name"
    if (selectedTimestamp) {
      const date = new Date(selectedTimestamp);
      const formattedTimestamp = date.toISOString().slice(0, 19);
      setUpdatedTimestamp(formattedTimestamp);
    }
    setUpdatedAmount(selctAmount);
  }, [open, selctAmount]);

  const { register, handleSubmit } = useForm();

  const { data: cashes } = useGetAllCashes();
  const { data: employees } = useGetAllEmployee();

  const { mutate, err } = useUpdateIncome();

  const handleClose = () => {
    setOpen(false);
  };

  const updateIncome = (body) => {
    mutate({
      ...body,
      id: incomeId,
      amount: updatedAmount,
    });
    handleClose();
  };

  const [cash, setCash] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleChangeCash = (event) => {
    setCash(event.target.value);
  };

  const handleEmployeeSelect = (event) => {
    setEmployeeId(event.target.value);
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
          <form onSubmit={handleSubmit(updateIncome)}>
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
                    {...register("cash_id")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={selctCashId}
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
                  value={updatedAmount}
                  onChange={(e) => setUpdatedAmount(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">₽</InputAdornment>
                    ),
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="Employee-simple-select-label">
                    Инициатор
                  </InputLabel>
                  <Select
                    {...register("employee_id")}
                    labelId="Employee-simple-select-label"
                    id="Employee-simple-select"
                    defaultValue={selctEmployeeId}
                    label="Инициатор"
                    onChange={handleEmployeeSelect}
                  >
                    {employees &&
                      employees.map((employee) => (
                        <MenuItem value={employee.id} key={employee.id}>
                          {employee.full_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <TextField
                  type="datetime-local"
                  {...register("timestamp")}
                  value={updatedTimestamp}
                  onChange={(e) => setUpdatedTimestamp(e.target.value)}
                />
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
                  Обновить приход
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

export default UpdateIncome;

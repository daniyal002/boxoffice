import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  TextareaAutosize,
} from "@mui/material";
import { useGetAllCashes } from "../../../../Cashe/hook/useCashe";
import { useGetAllEmployee } from "../../../../Employee/hook/useEmployee";
import { useUpdateExpense } from "../../../hook/useExpense";

const RUpdateExpense = ({
  open,
  setOpen,
  incomeId,
  selectedRegisterNumber,
  selectedCashId,
  selectedAmount,
  selectedEmployeeId,
  selectedTimestamp,
  selectedReason,
}) => {
  const [updatedAmount, setUpdatedAmount] = useState(selectedAmount);
  const [updatedTimestamp, setUpdatedTimestamp] = useState();
  const [updatedReason, setUpdatedReason] = useState(selectedReason);

  useEffect(() => {
    if (selectedTimestamp) {
      const date = new Date(selectedTimestamp);
      const formattedTimestamp = date.toISOString().slice(0, 19);
      setUpdatedTimestamp(formattedTimestamp);
    }
    setUpdatedAmount(selectedAmount);
    setUpdatedReason(selectedReason);
  }, [open, selectedAmount, selectedTimestamp, selectedReason]);

  const { register, handleSubmit } = useForm();

  const { data: cashes } = useGetAllCashes();
  const { data: employees } = useGetAllEmployee();

  const { mutate, err } = useUpdateExpense();

  const handleClose = () => {
    setOpen(false);
  };

  const updateIncome = (body) => {
    mutate({
      ...body,
      id: incomeId,
      registerNumber: selectedRegisterNumber,
      amount: updatedAmount,
      timestamp: updatedTimestamp,
      reason: updatedReason,
      status: "На согласовании",
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
                    defaultValue={selectedCashId}
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

                <FormControl fullWidth>
                  <TextField
                    type="number"
                    labelId="amoutn-label"
                    id="amount"
                    label="Сумма"
                    {...register("amount")}
                    value={updatedAmount}
                    onChange={(e) => setUpdatedAmount(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">₽</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="Employee-simple-select-label">
                    Инициатор
                  </InputLabel>
                  <Select
                    {...register("employee_id")}
                    labelId="Employee-simple-select-label"
                    id="Employee-simple-select"
                    defaultValue={selectedEmployeeId}
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

                <FormControl fullWidth>
                  <TextField
                    type="datetime-local"
                    labelId="timestamp-label"
                    id="timestamp"
                    placeholder="Дата выдачи"
                    {...register("timestamp")}
                    value={updatedTimestamp}
                    onChange={(e) => setUpdatedTimestamp(e.target.value)}
                  />
                </FormControl>

                <TextareaAutosize
                  {...register("reason")}
                  style={{
                    width: "270px",
                    height: "100px",
                    resize: "vertical",
                  }}
                  value={updatedReason}
                  onChange={(e) => setUpdatedReason(e.target.value)}
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

export default RUpdateExpense;

import React, { useState } from "react";
import { useRegistration } from "../../hook/useRegistration";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useGetAllEmployee } from "../../../Employee/hook/useEmployee";
import { useAuthorization } from "../../hook/useAuthorization";

const Registration = () => {
  const { mutate: Reg, error: errorReg, data: dataReg } = useRegistration();

  const { data: employees } = useGetAllEmployee();
  const { handleSubmit, register } = useForm();

  const reg = (body) => {
    Reg(body);
  };

  const [role, setRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleEmployeeSelect = (event) => {
    setEmployeeId(event.target.value); // Обновите employee_id при выборе значения
  };
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(reg)}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              margin: "20px",
              display: "flex",
              columnGap: "10px",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <TextField
              label="Логин"
              variant="outlined"
              {...register("login")}
              type="text"
            />
            <TextField
              label="Пароль"
              variant="outlined"
              type="password"
              {...register("password")}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Роль</InputLabel>
              <Select
                {...register("role")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Роль"
                onChange={handleChangeRole}
              >
                <MenuItem value="Admin">Админ</MenuItem>
                <MenuItem value="Director">Директор</MenuItem>
                <MenuItem value="cashierIncome">Кассир прихода</MenuItem>
                <MenuItem value="cashierExpense">Кассир расхода</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="Employee-simple-select-label">
                Сотрудник
              </InputLabel>
              <Select
                {...register("employee_id")}
                labelId="Employee-simple-select-label"
                id="Employee-simple-select"
                value={employeeId} // Используйте значение employeeId
                label="Сотрудник"
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
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="outlined" fullWidth>
              Регистрация
            </Button>
          </Grid>

          {errorReg && (
            <Alert
              severity="error"
              sx={{
                justifyContent: "center",
              }}
            >
              {errorReg}
            </Alert>
          )}
        </Grid>
      </form>
    </Grid>
  );
};

export default Registration;

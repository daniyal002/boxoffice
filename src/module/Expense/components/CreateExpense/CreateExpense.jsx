import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCashes } from "../../../Cashe/hook/useCashe";
import { useGetAllEmployee } from "../../../Employee/hook/useEmployee";
import { useCreateExpense } from "../../hook/useExpense";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const CreateExpense = () => {
  const { handleSubmit, register } = useForm();
  const { data: cashes } = useGetAllCashes();
  const { data: employees } = useGetAllEmployee();
  const { mutate, err } = useCreateExpense();

  const [cash, setCash] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleChangeCash = (event) => {
    setCash(event.target.value);
  };

  const handleEmployeeSelect = (event) => {
    setEmployeeId(event.target.value); // Обновите employee_id при выборе значения
    console.log(event.target.value);
  };

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Здесь вы можете выполнить необходимые действия с выбранным файлом, например, сохранить его в состоянии
      setUploadedFile(selectedFile);
    }
  };
  const CreateExpense = (body) => {
    const updatedBody = {
      ...body,
      status: "На согласовании",
      files: uploadedFile,
    };
    console.log(updatedBody); // Включите здесь console.log для отладки
    mutate(updatedBody);
  };

  return (
    <div>
      <h1>Создать заявку</h1>
      <Grid container>
        <form onSubmit={handleSubmit(CreateExpense)}>
          <Grid>
            <Grid>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Касса</InputLabel>
                <Select
                  {...register("cash_id")}
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
                  Инициатор
                </InputLabel>
                <Select
                  {...register("employee_id")}
                  labelId="Employee-simple-select-label"
                  id="Employee-simple-select"
                  value={employeeId} // Используйте значение employeeId
                  label="Инициатор"
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
              <TextareaAutosize {...register("reason")} />
              <TextField type="file" onChange={handleFileChange} />
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
                Создать Расход
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
        {err && (
          <Alert
            severity="error"
            sx={{
              justifyContent: "center",
            }}
          >
            {err}
          </Alert>
        )}
      </Grid>
    </div>
  );
};

export default CreateExpense;

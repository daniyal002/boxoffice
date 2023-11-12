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
  Typography,
} from "@mui/material";

const CreateExpense = () => {
  const { handleSubmit, register } = useForm();
  const { data: employees } = useGetAllEmployee();
  const { mutate, err } = useCreateExpense();

  const [employeeId, setEmployeeId] = useState("");

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
      cash_id: "1",
      status: "На согласовании",
      files: uploadedFile,
    };
    console.log(updatedBody); // Включите здесь console.log для отладки
    mutate(updatedBody);
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          color: "#2196f3",
          textAlign: "center",
          margin: "10px auto",
        }}
      >
        Создание заявку
      </Typography>
      <Grid
        container
        sx={{
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(CreateExpense)}>
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
              <TextField
                type="number"
                {...register("registerNumber")}
                label="Регистрационный номер"
                sx={{
                  width: "90%",
                }}
                required
              />
              <TextField
                type="number"
                {...register("amount")}
                label="Сумма"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₽</InputAdornment>
                  ),
                }}
                sx={{
                  width: "90%",
                }}
              />
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
                  sx={{
                    width: "90%",
                  }}
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
                sx={{
                  width: "90%",
                }}
              />
              <TextareaAutosize
                {...register("reason")}
                placeholder="Основание"
                style={{
                  width: "88%",
                  height: "100px",
                  resize: "vertical",
                  padding: "3px",
                }}
              />

              <TextField
                type="file"
                onChange={handleFileChange}
                sx={{
                  width: "90%",
                }}
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
                  width: "90%",
                }}
              >
                Создать Расход
              </Button>
            </Grid>
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
        </form>
      </Grid>
    </div>
  );
};

export default CreateExpense;

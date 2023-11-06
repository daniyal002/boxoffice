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
      <h1>Создать заявку</h1>
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
                {...register("amount")}
                label="Сумма"
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
              <TextareaAutosize
                {...register("reason")}
                placeholder="Основание"
                style={{
                  width: "400px",
                  height: "100px",
                  resize: "vertical",
                  padding: "3px",
                }}
              />

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

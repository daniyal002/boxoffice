import React, { useState } from "react";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateEmployee } from "../../hook/useEmployee";

const UpdateEmployee = ({ open, setOpen, fullName, employeeId }) => {
  const { register, handleSubmit } = useForm();
  const { mutate: employeeUpdate, err } = useUpdateEmployee();
  const handleClose = () => {
    setOpen(false);
  };

  // Создайте объект для хранения значения "name"
  const [updatedfullName, setUpdatedfullName] = useState(fullName);

  const updateCashe = (body) => {
    // Вместо обновления строки, обновите объект
    employeeUpdate({ ...body, id: employeeId, name: updatedfullName });
    handleClose();
  };

  useEffect(() => {
    // Используйте объект для установки значения "name"
    setUpdatedfullName(fullName);
  }, [open, fullName]);

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
          <form onSubmit={handleSubmit(updateCashe)}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <Grid>
                <TextField
                  type="text"
                  variant="outlined"
                  {...register("full_name")}
                  placeholder="ФИО сотрудника"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                  value={updatedfullName}
                  onChange={(e) => setUpdatedfullName(e.target.value)}
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
                  Обновить сотрудника
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

export default UpdateEmployee;

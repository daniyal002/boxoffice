import React, { useState } from "react";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdateCashe } from "../../hook/useCashe";
import { useEffect } from "react";

const UpdateCashe = ({ open, setOpen, casheId, casheName }) => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: casheUpdate, err } = useUpdateCashe();
  const handleClose = () => {
    setOpen(false);
  };

  // Создайте объект для хранения значения "name"
  const [updatedName, setUpdatedName] = useState(casheName);

  const updateCashe = (body) => {
    // Вместо обновления строки, обновите объект
    casheUpdate({ ...body, id: casheId, name: updatedName });
    handleClose();
  };

  useEffect(() => {
    // Используйте объект для установки значения "name"
    setUpdatedName(casheName);
  }, [open, casheName]);

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
                  {...register("name")}
                  placeholder="Название кассы"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
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
                  Обновить кассу
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

export default UpdateCashe;

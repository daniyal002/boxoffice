import React from "react";
import { useForm } from "react-hook-form";
import { useCreateCashe } from "../../hook/useCashe";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";

const CreateCashe = ({ open, setOpen }) => {
  const { register, handleSubmit } = useForm();
  const { mutate, err } = useCreateCashe();
  const handleClose = () => {
    setOpen(false);
  };
  const createCashe = (body) => {
    mutate(body);
    handleClose;
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
          <form onSubmit={handleSubmit(createCashe)}>
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
                  Создать кассу
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

export default CreateCashe;

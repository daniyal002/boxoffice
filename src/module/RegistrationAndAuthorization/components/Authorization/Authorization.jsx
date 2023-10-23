import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuthorization } from "../../hook/useAuthorization";

const Authorization = () => {
  const { mutate, error } = useAuthorization();

  const { handleSubmit, register } = useForm();

  const auth = (body) => {
    mutate(body);
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
      <form onSubmit={handleSubmit(auth)}>
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
              display: "flex",
              columnGap: "10px",
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
              Войти
            </Button>
          </Grid>
          {error && (
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
              <p>{error}</p>
            </Grid>
          )}
        </Grid>
      </form>
    </Grid>
  );
};

export default Authorization;

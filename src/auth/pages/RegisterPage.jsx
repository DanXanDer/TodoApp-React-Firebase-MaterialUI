import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "../../hooks";
import { AuthLayout } from "../Layout";

const registerForm = {
  user: "",
  email: "",
  password: "",
  password2: "",
};

export const RegisterPage = () => {
  const { user, email, password, password2, handleInputChange } =
    useForm(registerForm);
  return (
    <AuthLayout page="register">
      <Grid container mb={2}>
        <TextField
          name="user"
          value={user}
          onChange={handleInputChange}
          type="text"
          label="User"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          name="email"
          value={email}
          onChange={handleInputChange}
          type="email"
          label="Email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          value={password}
          onChange={handleInputChange}
          type="password"
          label="Password"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          name="password2"
          value={password2}
          onChange={handleInputChange}
          type="password"
          label="Confirm password"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid container mb={2}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            ":hover": { backgroundColor: "primary.light" },
            backgroundColor: "primary.dark",
          }}
        >
          Create account
        </Button>
      </Grid>
    </AuthLayout>
  );
};

import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { AuthLayout } from "../Layout";

export const RegisterPage = () => {
  return (
    <AuthLayout page="register">
      <Grid container mb={2}>
        <TextField label="User" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="Email" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField label="Password" fullWidth variant="outlined" />
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

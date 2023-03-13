import { Facebook, Google } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AuthLayout } from "../Layout";

export const LoginPage = () => {
  
  return (
    <AuthLayout page="login">
     
      <Grid container mb={2}>
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
          Login
        </Button>
      </Grid>
      <Divider sx={{ width: "100%" }}>Or</Divider>
      <Grid container mt={2}>
        <Button variant="outlined" fullWidth>
          <Google sx={{ mr: 1 }} />
          <Typography>Continue with Google</Typography>
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#3b5998",
            ":hover": { backgroundColor: "#3b5998", opacity: 0.8 },
            mt: 2,
          }}
        >
          <Facebook sx={{ mr: 1 }} />
          <Typography>Continue with Facebook</Typography>
        </Button>
      </Grid>
    </AuthLayout>
  );
};

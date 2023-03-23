import { Google, Login } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthStore, useForm } from "../../hooks";
import { PasswordInput } from "../components";
import { AuthLayout } from "../Layout";

const initialForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [login, setLoging] = useState(false);

  const {
    email,
    password,
    handleInputChange,
    formState,
    handleCheckEmptyForm,
  } = useForm({ initialForm });

  const {
    changeSubmitStatus,
    startLoginWithEmailAndPassword,
    startLoginWithGoogle,
    checkingForm,
  } = useAuthStore();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoging(true);
    changeSubmitStatus(true);

    if (handleCheckEmptyForm()) {
      swal("Invalid login", "Don't leave empty fields", "error");
    } else {
      const { ok } = await startLoginWithEmailAndPassword(formState);
      if (ok === false) {
        swal(
          "Invalid credentials",
          "Email or password invalid. Try again",
          "error"
        );
      }
    }
    setLoging(false);
  };

  const handleLoginWithGoogle = async () => {
    await startLoginWithGoogle();
  };

  return (
    <AuthLayout page="login">
      <form onSubmit={handleLoginSubmit}>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <TextField
              name="email"
              value={email}
              onChange={handleInputChange}
              type="email"
              label="Email"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} mb={2}>
            <PasswordInput
              label="Password"
              inputName="password"
              passwordValue={password}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mb={2}>
            <LoadingButton
              loadingPosition="start"
              startIcon={<Login />}
              loading={login}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                ":hover": { backgroundColor: "primary.light" },
                backgroundColor: "primary.dark",
              }}
            >
              Login
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ width: "100%" }}>Or</Divider>
      <Grid container mt={2}>
        <Button
          disabled={checkingForm}
          onClick={handleLoginWithGoogle}
          variant="contained"
          fullWidth
          sx={{
            ":hover": { backgroundColor: "secondary.main" },
            backgroundColor: "white",
            color: "black",
          }}
        >
          <Google sx={{ mr: 1 }} />
          <Typography>Continue with Google</Typography>
        </Button>
      </Grid>
    </AuthLayout>
  );
};

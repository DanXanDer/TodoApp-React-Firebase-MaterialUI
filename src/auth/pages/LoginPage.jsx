import { Facebook, Google } from "@mui/icons-material";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useAuthStore, useForm } from "../../hooks";
import { ErrorMessage, PasswordInput } from "../components";
import { AuthLayout } from "../Layout";

const loginForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { email, password, handleInputChange, formState } = useForm(loginForm);

  const { changeSubmitStatus, startLogin } = useAuthStore();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    let isFormEmpty = false;
    changeSubmitStatus(true);
    const checkFormValues = () => {
      for (const formValue of Object.keys(formState)) {
        if (formState[formValue] === "") return (isFormEmpty = true);
      }
      isFormEmpty = false;
    };
    checkFormValues();
    if (isFormEmpty === true) {
      swal("Invalid login", "Enter valid credentials", "error");
    }
    else{
      await startLogin(formState);
    }
  };

  return (
    <AuthLayout page="login">
      <form onSubmit={handleLoginSubmit}>
        <Grid container mb={2}>
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
        <Grid container mb={2}>
          <PasswordInput
            label="Password"
            inputName="password"
            passwordValue={password}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <ErrorMessage />
        <Grid container mb={2}>
          <Button
            type="submit"
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
          <Button
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white", color: "gray" }}
          >
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
      </form>
    </AuthLayout>
  );
};

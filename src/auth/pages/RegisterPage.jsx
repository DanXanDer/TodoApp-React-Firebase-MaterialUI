import { Button, Grid, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import ReactPasswordChecklist from "react-password-checklist";
import swal from "sweetalert";
import { useForm, useUiStore } from "../../hooks";
import { AuthLayout } from "../Layout";

const registerForm = {
  user: "",
  email: "",
  password: "",
  passwordAgain: "",
};

const formErrors = {
  user: [
    (value = "") => {
      return value.length >= 4 ? true : false;
    },
    "User must have more than 3 digits",
  ],
  email: [(value = "") => value.split("").includes("@"), "Invalid email"],
};

export const RegisterPage = () => {
  const {
    user,
    email,
    password,
    passwordAgain,
    emailValidation,
    userValidation,
    formValid,
    handleInputChange,
  } = useForm(registerForm, formErrors);

  const [passwordValid, setPasswordValid] = useState(true);

  const { submitted, checking, changeSubmitStatus } = useUiStore();

  const handleCheckForm = () => {
    setPasswordValid(!passwordValid);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    changeSubmitStatus(true);
    if (!passwordValid || !formValid) {
      swal("Invalid register", "Try again", "error");
    } else {
      swal("Account created", "You can login now", "success");
    }
  };

  const visiblePasswordCheckList = useMemo(() => {
    return password !== "" ? "flex" : "none";
  }, [password]);

  return (
    <AuthLayout page="register">
      <form onSubmit={handleSubmitForm}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <TextField
              name="user"
              error={submitted && !!userValidation}
              fullWidth
              helperText={submitted && userValidation}
              value={user}
              onChange={handleInputChange}
              type="text"
              label="User"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              error={submitted && !!emailValidation}
              value={email}
              helperText={submitted && emailValidation}
              onChange={handleInputChange}
              type="email"
              label="Email"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="password"
              value={password}
              onChange={handleInputChange}
              type="password"
              label="Password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="passwordAgain"
              value={passwordAgain}
              onChange={handleInputChange}
              type="password"
              label="Confirm password"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container mb={2} sx={{ display: `${visiblePasswordCheckList}` }}>
          <ReactPasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            onChange={handleCheckForm}
            messages={{
              minLength: "Password has more than eight characters.",
              specialChar: "Password has special characters.",
              number: "Password has a number.",
              capital: "Password has an uppercase.",
              match: "Passwords match.",
            }}
          />
        </Grid>
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
            Create account
          </Button>
        </Grid>
      </form>
    </AuthLayout>
  );
};

import { Button, Grid, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import ReactPasswordChecklist from "react-password-checklist";
import swal from "sweetalert";
import { useAuthStore, useForm } from "../../hooks";
import { ErrorMessage, PasswordInput } from "../components";
import { AuthLayout } from "../Layout";

const initialForm = {
  displayName: "",
  email: "",
  password: "",
  passwordAgain: "",
};

const formErrors = {
  displayName: [
    (value = "") => {
      return value.length >= 4 ? true : false;
    },
    "User must have more than 3 digits",
  ],
  email: [(value = "") => value.split("").includes("@"), "Invalid email"],
};

export const RegisterPage = () => {
  const {
    displayName,
    email,
    password,
    passwordAgain,
    emailValidation,
    displayNameValidation,
    formValid,
    formState,
    handleInputChange,
    handleFormReset,
    handleCheckEmptyForm
  } = useForm({initialForm, formErrors});

  const [passwordValid, setPasswordValid] = useState(true);

  const {
    submitted,
    startRegisterWithEmailAndPassword,
    changeSubmitStatus,
    errorMsg,
  } = useAuthStore();

  const handleCheckForm = () => {
    setPasswordValid(!passwordValid);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    changeSubmitStatus(true);
    if(handleCheckEmptyForm()){
      swal("Invalid register", "Don't leave empty fields!", "error")
    }
    else if (!passwordValid || !formValid) {
      swal("Invalid register", "Try again", "error");
    } else {
      const {ok} = await startRegisterWithEmailAndPassword(formState);
      if (ok) {
        swal("Account created", "You can login now", "success");
        handleFormReset();
        changeSubmitStatus(false);
      } else {
        swal("Invalid register", "Email already exists", "error");
      }
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
              name="displayName"
              error={submitted && !!displayNameValidation}
              fullWidth
              helperText={submitted && displayNameValidation}
              value={displayName}
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
            <PasswordInput
              label="Password"
              inputName="password"
              passwordValue={password}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <PasswordInput
              label="Confirm"
              inputName="passwordAgain"
              passwordValue={passwordAgain}
              handleInputChange={handleInputChange}
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
            Create account
          </Button>
        </Grid>
      </form>
    </AuthLayout>
  );
};

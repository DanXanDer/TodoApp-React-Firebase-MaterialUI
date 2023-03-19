import { Box, Button, ButtonGroup, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks";

export const AuthLayout = ({ children, page = "" }) => {
  const { submitted, changeSubmitStatus, cleanErrorMsg } = useAuthStore();

  const navigate = useNavigate();

  const handleGoToRegisterPage = () => {
    if (submitted === true) {
      changeSubmitStatus(false);
      cleanErrorMsg();
    }
    navigate("/auth/register");
  };

  const handleGoToLoginPage = () => {
    if (submitted === true) {
      changeSubmitStatus(false);
      cleanErrorMsg();
    }
    navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(to right, #36d1dc, #5b86e5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Grid
        container
        sx={{
          width: 350,
          backgroundColor: "white",
          padding: "20px 25px",
          borderRadius: 1,
          boxShadow:
            "0px 0px 10px 5px rgba(0,0,0,0.2),0px 10px 15px -3px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            fullWidth
            sx={{
              mb: 2,
            }}
          >
            <Button
              disabled={page === "login" ? true : false}
              sx={{
                ":hover": { backgroundColor: "primary.light" },
              }}
              onClick={handleGoToLoginPage}
            >
              Login form
            </Button>
            <Divider orientation="vertical"></Divider>
            <Button
              disabled={page === "register" ? true : false}
              sx={{
                ":hover": { backgroundColor: "primary.light" },
              }}
              onClick={handleGoToRegisterPage}
            >
              Register form
            </Button>
          </ButtonGroup>
        </Grid>
        <Box
          sx={{
            height: 100,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <img
            src="../../assets/todoImg.png"
            style={{ height: "100%", width: "40%" }}
          />
        </Box>

        {children}
      </Grid>
    </Box>
  );
};

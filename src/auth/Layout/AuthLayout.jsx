import { Image } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AuthLayout = ({ children, page = "" }) => {
  const navigate = useNavigate();

  const handleGoToRegisterPage = () => {
    navigate("/auth/register");
  };

  const handleGoToLoginPage = () => {
    navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "primary.main",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          width: 450,
          backgroundColor: "secondary.main",
          borderRadius: 3,
          padding: 3,
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
            height: 80,
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

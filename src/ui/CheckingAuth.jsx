import { CircularProgress, Grid } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "primary.main",
      }}
    >
      <CircularProgress sx={{ color: "secondary.main" }} />
    </Grid>
  );
};

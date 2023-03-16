import { Alert, Grid } from "@mui/material";
import { useMemo } from "react";
import { useAuthStore } from "../../hooks";

export const ErrorMessage = () => {
  const { errorMsg } = useAuthStore();

  const visibleError = useMemo(() => {
    return errorMsg !== undefined ? "flex" : "none";
  }, [errorMsg]);

  return (
    <Grid container mb={2} sx={{ display: `${visibleError}` }}>
      <Alert
        sx={{ width: "100%", justifyContent: "center" }}
        variant="filled"
        severity="error"
      >
        {errorMsg}
      </Alert>
    </Grid>
  );
};

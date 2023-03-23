import { ListAlt } from "@mui/icons-material";
import { Grid, Toolbar, Typography } from "@mui/material";

export const NothingSelectedView = ({ excessHeight }) => {
  return (
    <>
      <Toolbar />
      <Grid
        container
        sx={{
          backgroundColor: "primary.dark",
          borderRadius: 5,
          p: 3,
          minHeight: `calc(100vh - ${excessHeight})`,
          color: "secondary.main",
        }}
      >
        <Grid
          container
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            <ListAlt sx={{ fontSize: "100px" }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Select or add a new todo</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

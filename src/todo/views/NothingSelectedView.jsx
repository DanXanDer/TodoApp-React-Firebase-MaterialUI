import { AddCircle, StarBorderPurple500 } from "@mui/icons-material";
import { Grid, IconButton, Toolbar, Typography } from "@mui/material";

export const NothingSelectedView = ({ excessHeight }) => {
  return (
    <>
      <Toolbar />
      <Grid
        sx={{
          display: "grid",
          gridTemplate: "5fr 1fr / 1fr",
          backgroundColor: "primary.main",
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
            <StarBorderPurple500 sx={{ fontSize: "100px" }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Select or add a new todo</Typography>
          </Grid>
        </Grid>

        <Grid item sx={{ justifySelf: "end", alignSelf: "center" }}>
          <IconButton sx={{ color: "error.main" }}>
            <AddCircle sx={{ fontSize: "70px" }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

import { Delete, Save } from "@mui/icons-material";
import { Button, Grid, TextField, Toolbar, Typography } from "@mui/material";

export const ActiveTodoView = ({ excessHeight }) => {
  return (
    <>
      <Toolbar />
      <Grid
        container
        sx={{
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
          borderRadius: 5,
          p: 3,
          minHeight: `calc(100vh - ${excessHeight})`,
          boxShadow:
            "0px 0px 14px 8px rgba(0,0,0,0.15),0px 10px 15px -3px rgba(0,0,0,0.1)",
        }}
      >
        <Grid item>
          <form>
            <Grid
              container
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item xs={6.5} md={9.5}>
                <TextField fullWidth label="Task description" variant="standard" />
              </Grid>
              <Grid item xs={4.5} md={2} sx={{alignSelf: "end"}} >
                <Button fullWidth variant="contained" startIcon={<Save />}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item sx={{ justifySelf: "end", alignSelf: "end" }}>
          <Button color="error" variant="contained" startIcon={<Delete />}>
            Delete TODO
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

import { AddCircle, Delete, Save } from "@mui/icons-material";
import {
  Button,
  Grid,
  Icon,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

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
            <Grid mb={5} container sx={{ justifyContent: "end" }}>
              <Button variant="contained" startIcon={<Save />}>
                Save task
              </Button>
            </Grid>
            <Grid
              container
              sx={{
                flexDirection: { xs: "column", lg: "row" },
                justifyContent: {lg: "space-between"},
                gap: 2,
              }}
              
            >
              <Grid item xs={12} lg={5.7}>
                <TextField fullWidth label="Task name" variant="standard" />
              </Grid>
              <Grid item xs={12} lg={5.7}>
                <Grid
                  container
                  sx={{
                    flexDirection: { xs: "column", lg: "row" },
                    justifyContent: { lg: "space-between" },
                    gap: 2,
                  }}
                >
                  <Grid item xs={12} lg={5.7} >
                    <DatePicker
                      label="Start date"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={5.7} >
                    <DatePicker
                      label="End date"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Grid>
                </Grid>
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

import { addDays, addHours, differenceInDays } from "date-fns";
import { Save } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useUiStore } from "../../hooks";
import { useState } from "react";

const priorities = [
  {
    value: "Urgent",
    label: "Urgent",
  },
  {
    value: "Important",
    label: "Important",
  },
  {
    value: "Normal",
    label: "Normal",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const start = "startDate";
const end = "endDate";

export const AddTodo = () => {
  const { closeModal, modalOpen } = useUiStore();

  const [formValues, setFormValues] = useState({
    title: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    priority: "",
  });

  const { title, startDate, endDate, priority } = formValues;

  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (newValue, dateName) => {
    setFormValues({
      ...formValues,
      [dateName]: newValue,
    });
  };

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    const daysDifference = differenceInDays(endDate, startDate);
    console.log(daysDifference);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={modalOpen}>
        <form onSubmit={handleAddNewTodo}>
          <Box sx={style}>
            <Grid container gap={3}>
              <Grid item xs={12}>
                <Typography variant="h5" textAlign="center">
                  Add new todo
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Todo title"
                  variant="standard"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  maxDate={endDate}
                  disablePast
                  name="startDate"
                  value={startDate}
                  onChange={(newValue) => handleDateChange(newValue, start)}
                  label="Start date"
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  minDate={startDate}
                  disablePast
                  name="endDate"
                  value={endDate}
                  onChange={(newValue) => handleDateChange(newValue, end)}
                  label="End date"
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="priority"
                  value={priority}
                  onChange={handleInputChange}
                  select
                  label="Priority"
                  defaultValue="Normal"
                >
                  {priorities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sx={{ margin: "0 auto" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<Save />}
                >
                  Add todo
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Fade>
    </Modal>
  );
};

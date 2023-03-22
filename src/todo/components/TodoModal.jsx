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
import { useForm, useTodoStore, useUiStore } from "../../hooks";
import { useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import { LoadingButton } from "@mui/lab";

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

const cleanedForm = {
  title: "",
  startDate: new Date(),
  endDate: addDays(new Date(), 1),
  priority: "",
};

export const TodoModal = () => {
  
  const [initialForm, setInitialForm] = useState(cleanedForm);
  
  const [saving, setSaving] = useState(false);

  const { closeModal, modalOpen } = useUiStore();

  const { startAddNewTodo, todoEdit, setEditTodo, startEditTodo } =
    useTodoStore();

  const modalTitle = useMemo(() => {
    return todoEdit === null ? "Add new todo" : "Edit todo";
  }, [modalOpen]);


  useEffect(() => {
    if (todoEdit !== null) {
      setInitialForm({...todoEdit});
    }
  }, [modalOpen]);

  const {
    title,
    priority,
    startDate,
    endDate,
    formState,
    handleFormReset,
    handleDateChange,
    handleInputChange,
    handleCheckEmptyForm,
  } = useForm({ initialForm });

  


  const handleTodoSubmit = async (event) => {
    event.preventDefault();
    if (handleCheckEmptyForm()) {
      swal("ToDo add failed", "Don't leave empty fields!", "error");
    } else {
      if (todoEdit === null) {
        setSaving(true);
        const { ok } = await startAddNewTodo(formState);
        setSaving(false);
        if (ok) {
          swal("New ToDo add!", "Add tasks to your new ToDo", "success");
          handleFormReset(cleanedForm);
          handleCloseModal();
        } else {
          swal("ToDo add failed", "Try again", "error");
        }
      } else {
        setSaving(true);
        const { ok } = await startEditTodo(formState);
        setSaving(false);
        if (ok) {
          swal("ToDo edited!", "ToDo has been edited correctly", "success");
          handleFormReset(cleanedForm);
          handleCloseModal();
        } else {
          swal("ToDo edit failed", "Try again", "error");
        }
      }
    }
  };

  const handleCloseModal = () => {
    closeModal();
    setEditTodo(null);
    handleFormReset(cleanedForm);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={modalOpen}>
        <form onSubmit={handleTodoSubmit}>
          <Box sx={style}>
            <Grid container gap={3}>
              <Grid item xs={12}>
                <Typography variant="h5" textAlign="center">
                  {modalTitle}
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
                >
                  {priorities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sx={{ margin: "0 auto" }}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  loading={saving}
                  loadingPosition="start"
                  startIcon={<Save />}
                  variant="contained"
                >
                  Save
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Fade>
    </Modal>
  );
};

import { CalendarMonth, Delete, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm, useTodoStore } from "../../hooks";
import { TasksTable } from "../components";
// import { TasksTable } from "../components";

const initialForm = {
  completed: false,
  taskDesc: "",
};

export const ActiveTodoView = ({ excessHeight }) => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    taskDesc,
    formState,
    handleInputChange,
    handleCheckEmptyForm,
    handleFormReset,
  } = useForm({ initialForm });

  const { activeTodo, startAddNewTask, startDeleteTodo } = useTodoStore();

  const stringifiedStartDate = useMemo(() => {
    return activeTodo.startDate.toLocaleDateString("en-GB");
  }, [activeTodo]);

  const stringifiedEndDate = useMemo(() => {
    return activeTodo.endDate.toLocaleDateString("en-GB");
  }, [activeTodo]);

  useEffect(() => {
    handleFormReset(initialForm);
  }, [activeTodo]);

  const handleDeleteTodo = async () => {
    const willDelete = await swal({
      title: "Are you sure you want to delete this todo?",
      text: "All the tasks of the todo will also be deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete === true) {
      setDeleting(true);
      const { ok } = await startDeleteTodo();
      if (ok === true) {
        swal("ToDo deleted!", "ToDo has been deleted successfuly", "success");
      } else {
        swal("An error has ocurred", "ToDo couldn't be deleted", "error");
      }
      setDeleting(false);
    }
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    if (handleCheckEmptyForm() === true) {
      swal("Task couldn't be added", "Don't leave the field empty!", "error");
    } else {
      setSaving(true);
      const { ok } = await startAddNewTask(formState);
      if (ok === true) {
        swal("Task added!", "The task has been added correctly", "success");
      } else {
        swal("Task couldn't be added", "An error has ocurred", "error");
      }
    }
    setSaving(false);
    handleFormReset(initialForm);
  };

  return (
    <>
      <Toolbar />
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplate: "0fr 0fr 1fr 0fr / 1fr",
          gap: 2,
          borderRadius: 5,
          p: 3,
          minHeight: `calc(100vh - ${excessHeight})`,
          boxShadow:
            "0px 0px 14px 8px rgba(0,0,0,0.15),0px 10px 15px -3px rgba(0,0,0,0.1)",
        }}
      >
        <Grid item>
          <form onSubmit={handleTaskSubmit}>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item xs={12} sm={6.5} md={9.5} sx={{ mb: { xs: 1 } }}>
                <TextField
                  name="taskDesc"
                  value={taskDesc}
                  onChange={handleInputChange}
                  fullWidth
                  label="Task description..."
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4.5} md={2} sx={{ alignSelf: "end" }}>
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
          </form>
        </Grid>
        <Grid container sx={{ justifyContent: "space-between", gap: 1 }}>
          <Grid item>
            <Typography
              sx={{ overflowWrap: "anywhere", fontWeight: "bolder" }}
              variant="h6"
            >
              {activeTodo.title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container sx={{ alignItems: "center", gap: 0.5 }}>
              <CalendarMonth />
              <Typography  sx={{ color: "primary.light" }}>
                Date: {stringifiedStartDate} - {stringifiedEndDate}
              </Typography>
            </Grid>
          </Grid>
          {/* <Typography variant="h5">asdasdads </Typography> */}
        </Grid>
        <TasksTable />

        <Grid item sx={{ justifySelf: "end" }}>
          <LoadingButton
            loading={deleting}
            loadingPosition="start"
            onClick={handleDeleteTodo}
            color="error"
            variant="contained"
            startIcon={<Delete />}
          >
            Delete TODO
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

import { Delete, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField, Toolbar } from "@mui/material";
import { useState } from "react";
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
    completed,
    taskDesc,
    formState,
    handleInputChange,
    handleCheckEmptyForm,
  } = useForm({ initialForm });

  const { activeTodo, startAddNewTask, startDeleteTodo } = useTodoStore();

  const handleDeleteTodo = async () => {
    setDeleting(true);
    const { ok } = await startDeleteTodo();
    if (ok === true) {
      swal("ToDo deleted!", "ToDo has been deleted successfuly", "success");
    } else {
      swal("An error has ocurred", "ToDo couldn't be deleted", "error");
    }
    setDeleting(false);
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
  };

  return (
    <>
      <Toolbar />
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplate: "0fr 1fr 0fr / 1fr",
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
        <Grid item xs={12}>
          <TasksTable />
        </Grid>
        <Grid item sx={{ justifySelf: "end" }}>
          <Button
            onClick={handleDeleteTodo}
            color="error"
            variant="contained"
            startIcon={<Delete />}
          >
            Delete TODO
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

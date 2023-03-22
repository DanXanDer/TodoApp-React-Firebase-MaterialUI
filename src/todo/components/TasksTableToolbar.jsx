import { Delete, DoneOutline } from "@mui/icons-material";
import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import swal from "sweetalert";
import { useTodoStore } from "../../hooks/useTodoStore";

export const TasksTableToolbar = ({ numSelected, selected }) => {
  const { startDeletingTodoTasks,/*  startCompleteTodoTasks */ } = useTodoStore();

  const handleDeleteTodoTasks = async () => {
    const willDelete = await swal({
      title: "Delete task(s)",
      text: "Are you sure you want to delete these tasks?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete === true) {
      const { ok } = await startDeletingTodoTasks(selected);
      if (ok === true) {
        swal("Success", "Selected tasks has been deleted", "success");
      } else {
        swal("Error", "An error has ocurred. Try again", "error");
      }
    }
  };

  // const handleCompleteTodoTasks = async () => {
  //   await startCompleteTodoTasks(selected);
  // };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Task list
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteTodoTasks}>
              <Delete />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Mark as completed">
            <IconButton onClick={handleCompleteTodoTasks}>
              <DoneOutline />
            </IconButton>
          </Tooltip> */}
        </>
      ) : null}
    </Toolbar>
  );
};

import { Delete, DoneOutline, FilterList } from "@mui/icons-material";
import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import swal from "sweetalert";
import { getFilterValueFromMenu } from "../../helpers/getFilterValueFromMenu";
import { useTodoStore } from "../../hooks/useTodoStore";
import { FilterMenu } from "./FilterMenu";

const tasksStatus = ["Completed", "Incompleted"];

export const TasksTableToolbar = ({ numSelected, selected }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { filterTaskValue, startDeletingTodoTasks, setFilterTaskValue } =
    useTodoStore();

  const handleClose = (event) => {
    const { filterValue } = getFilterValueFromMenu(event, tasksStatus);
    setFilterTaskValue(filterValue);
    setAnchorEl(null);
  };

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
          {!!filterTaskValue
            ? `${filterTaskValue} tasks`
            : `All tasks`}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteTodoTasks}>
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton onClick={handleMenu}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <FilterMenu
            filterOptions={tasksStatus}
            anchorEl={anchorEl}
            showAllTitle="Show all tasks"
            handleClose={handleClose}
          />
        </>
      )}
    </Toolbar>
  );
};

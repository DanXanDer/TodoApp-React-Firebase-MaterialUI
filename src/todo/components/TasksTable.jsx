import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { TasksTableHead, TasksTableToolbar } from "./";
import { useEffect, useState } from "react";
import { useTodoStore } from "../../hooks";
import { Tooltip } from "@mui/material";

export const TasksTable = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { activeTodo, startCompleteTodoTasks } = useTodoStore();

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  useEffect(() => {
    setSelected([]);
  }, [activeTodo]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = activeTodo.tasks.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCompleteTodoTasks = async (event, taskId, taskCompletedValue) => {
    await startCompleteTodoTasks(taskId, taskCompletedValue);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - activeTodo.tasks.length)
      : 0;

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TasksTableToolbar numSelected={selected.length} selected={selected} />
        <TableContainer sx={{ height: "70%" }}>
          <Table
            sx={{ height: "100%", minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TasksTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={activeTodo.tasks.length}
            />

            <TableBody>
              {activeTodo.tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((taskRow, index) => {
                  const isItemSelected = isSelected(taskRow.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={taskRow.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, taskRow.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <Tooltip
                        followCursor
                        arrow
                        title={taskRow.completed === true ? "Task completed" : "Task incompleted"}
                      >
                        <TableCell
                          onClick={(event) =>
                            handleCompleteTodoTasks(
                              event,
                              taskRow.id,
                              taskRow.completed
                            )
                          }
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          sx={{
                            textDecorationLine:
                              taskRow.completed === true ? "line-through" : "",
                          }}
                        >
                          {taskRow.taskDesc}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activeTodo.tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

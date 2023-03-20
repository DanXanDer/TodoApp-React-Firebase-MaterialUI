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
import { Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTodoStore } from "../../hooks";

function createData(name, calories) {
  return {
    name,
    calories,
  };
}

// const rows = [
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
//   createData("Cupcake", 305),
// ];

export const TasksTable = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { activeTodo } = useTodoStore();

  const taskRows = useMemo(() => {
    const tasks = [];
    if (!!activeTodo.tasks) {
      activeTodo.tasks.forEach((task) => {
        tasks.push(task);
      });
    }
    console.log(tasks);
    return tasks;
  }, [activeTodo]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - taskRows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TasksTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ height: "70%" }}>
          <Table sx={{ height: "100%" }} aria-labelledby="tableTitle">
            <TasksTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={taskRows.length}
            />

            <TableBody>
              {taskRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((taskRow, index) => {
                  const isItemSelected = isSelected(taskRow.taskDesc);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, taskRow.taskDesc)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={taskRow.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {taskRow.taskDesc}
                      </TableCell>
                      <TableCell align="right">{taskRow.completed}</TableCell>
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
          count={taskRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Task",
  },
  {
    id: "check",
    numeric: true,
    disablePadding: false,
    label: "Check",
  },

];

export const TasksTableHead = ({ onSelectAllClick, numSelected, rowCount }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

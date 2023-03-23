import { Menu, MenuItem } from "@mui/material";

export const FilterMenu = ({
  filterOptions,
  anchorEl,
  showAllTitle,
  handleClose,
}) => {

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem divider onClick={handleClose}>
        {showAllTitle}
      </MenuItem>
      {filterOptions.map((filterValue) => {
        return (
          <MenuItem key={filterValue} onClick={handleClose}>
            {filterValue}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

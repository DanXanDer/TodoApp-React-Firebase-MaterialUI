import { Add, FilterList, ListAlt } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTodoStore, useUiStore } from "../../hooks";
import { SideBarList } from "./SideBarList";

const todosPriorities = ["Normal", "Important", "Urgent"];

export const SideBarContent = () => {
  const { navbarHeight, openModal } = useUiStore();

  const { todosStatus, setFilterValue } = useTodoStore();

  const handleOpenModal = () => {
    openModal();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    const filterSelected = todosPriorities.some(
      (priority) => priority === event.currentTarget.innerText
    );
    let filterValue = undefined;
    if (filterSelected === true) {
      filterValue = event.currentTarget.innerText;
    } 
    setFilterValue(filterValue);
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton onClick={handleMenu} edge="end" color="secondary">
            <FilterList />
          </IconButton>
        }
        sx={{
          height: `${navbarHeight}px`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListItemButton>
          <Button
            onClick={handleOpenModal}
            fullWidth
            variant="outlined"
            color="info"
            startIcon={<Add />}
          >
            Add todo
          </Button>
        </ListItemButton>
      </ListItem>
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
          Show all todos
        </MenuItem>
        {todosPriorities.map((priority) => {
          return (
            <MenuItem key={priority} onClick={handleClose}>
              {priority}
            </MenuItem>
          );
        })}
      </Menu>

      <Divider sx={{ backgroundColor: "info.dark" }} />
      {todosStatus === "noEmpty" ? (
        <SideBarList />
      ) : (
        <Grid
          container
          sx={{
            margin: "auto",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item p={3}>
            {todosStatus === "loading" ? (
              <CircularProgress sx={{ color: "secondary.main" }} />
            ) : (
              <>
                <ListAlt sx={{ color: "secondary.main", fontSize: "80px" }} />
                <Typography sx={{ color: "secondary.main", fontSize: "22px" }}>
                  There are no todos added!
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

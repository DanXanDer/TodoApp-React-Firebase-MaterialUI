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
import { getFilterValue } from "../../helpers/getFilterValue";
import { useTodoStore, useUiStore } from "../../hooks";
import { FilterMenu } from "./FilterMenu";
import { SideBarList } from "./SideBarList";

const todosPriorities = ["Normal", "Important", "Urgent"];

export const SideBarContent = () => {
  const { navbarHeight, openModal } = useUiStore();

  const { todosStatus, setfilterTodoValue } = useTodoStore();

  const handleOpenModal = () => {
    openModal();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    const { filterValue } = getFilterValue(event, todosPriorities);
    setfilterTodoValue(filterValue);
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
      <FilterMenu
        filterOptions={todosPriorities}
        anchorEl={anchorEl}
        showAllTitle="Show all todos"
        handleClose={handleClose}
      />
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

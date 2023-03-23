import {
  Add,
  FilterList,
  ListAlt,
  LowPriority,
  PriorityHigh,
  StarRate,
} from "@mui/icons-material";
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
import { useEffect, useMemo, useState } from "react";
import { lowerCaseFirstLetter } from "../../helpers";
import { getFilterValueFromMenu } from "../../helpers/getFilterValueFromMenu";
import { useTodoStore, useUiStore } from "../../hooks";
import { FilterMenu } from "./FilterMenu";
import { SideBarList } from "./SideBarList";

const todosPriorities = ["Normal", "Important", "Urgent"];

export const SideBarContent = () => {
  const { navbarHeight, openModal } = useUiStore();

  const { completedFirstLoad } = useTodoStore();

  const {
    todosStatus,
    filterTodoValue,
    todos,
    setfilterTodoValue,
    setTodosStatus,
  } = useTodoStore();

  const displayedTodos = useMemo(() => {
    if (!!filterTodoValue) {
      const filteredTodos = todos.filter(
        (todo) => todo.priority === filterTodoValue
      );
      return filteredTodos;
    } else {
      return todos;
    }
  }, [todos, filterTodoValue]);

  useEffect(() => {
    if (completedFirstLoad === true) {
      displayedTodos.length === 0
        ? setTodosStatus("empty")
        : setTodosStatus("noEmpty");
    }
  }, [displayedTodos]);

  const SideBarEmptyMessage = useMemo(() => {
    if (todosStatus === "empty") {
      if (!filterTodoValue) {
        return (
          <>
            <ListAlt sx={{ color: "secondary.main", fontSize: "80px" }} />
            <Typography sx={{ color: "secondary.main", fontSize: "22px" }}>
              There are no todos added!
            </Typography>
          </>
        );
      } else {
        let emptyIcon;
        if (filterTodoValue === "Normal") {
          emptyIcon = (
            <LowPriority sx={{ color: "secondary.main", fontSize: "80px" }} />
          );
        } else if (filterTodoValue === "Important") {
          emptyIcon = (
            <StarRate sx={{ color: "secondary.main", fontSize: "80px" }} />
          );
        } else {
          emptyIcon = (
            <PriorityHigh sx={{ color: "secondary.main", fontSize: "80px" }} />
          );
        }
        return (
          <>
            {emptyIcon}
            <Typography sx={{ color: "secondary.main", fontSize: "22px" }}>
              There are no {lowerCaseFirstLetter(filterTodoValue)} todos added!
            </Typography>
          </>
        );
      }
    }
  }, [todosStatus, filterTodoValue]);

  const handleOpenModal = () => {
    openModal();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    const { filterValue } = getFilterValueFromMenu(event, todosPriorities);
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
            sx={{ width: "90%" }}
            variant="contained"
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
      <Divider sx={{ backgroundColor: "primary.dark" }} />
      {todosStatus === "noEmpty" ? (
        <SideBarList displayedTodos={displayedTodos} />
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
             SideBarEmptyMessage 
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

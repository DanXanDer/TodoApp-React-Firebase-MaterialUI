import {
  Edit,
  ListAlt,
  LowPriority,
  PriorityHigh,
  StarRate,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useTodoStore, useUiStore } from "../../hooks";

export const SideBarItem = ({ todo }) => {
  const { openModal, changeMobileOpenStatus, mobileOpen } = useUiStore();

  const { activeTodo, setFilterTaskValue, setActiveTodo, setEditTodo } =
    useTodoStore();

  const handleOpenModal = () => {
    openModal();
    setEditTodo(todo);
  };

  const stringifiedStartDate = useMemo(() => {
    return todo.startDate.toLocaleDateString("en-GB");
  }, [todo]);

  const stringifiedEndDate = useMemo(() => {
    return todo.endDate.toLocaleDateString("en-GB");
  }, [todo]);

  const priorityIcon = useMemo(() => {
    if (todo.priority === "Normal") {
      return <LowPriority color="info" />;
    } else if (todo.priority === "Important") {
      return <StarRate color="warning" />;
    } else {
      return <PriorityHigh color="error" />;
    }
  }, [todo]);

  const handleSelectActiveTodo = () => {
    //TODO: Modificar para que cargue desde los arrays locales luego de que se haya cargado las tareas por primera vez desde la BD
    setFilterTaskValue();
    setActiveTodo(todo);
    changeMobileOpenStatus(!mobileOpen);
  };

  return (
    <div>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton onClick={handleOpenModal} edge="end" color="secondary">
            <Edit />
          </IconButton>
        }
      >
        <ListItemButton
          onClick={handleSelectActiveTodo}
          selected={todo.id === activeTodo?.id}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "primary.light",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: "secondary.main" }}>
            {priorityIcon}
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <Typography
                  sx={{
                    color: "secondary.main",
                    fontWeight: "bold",
                    wordBreak: "break-word",
                    maxLines: 2,
                    mb: 1,
                  }}
                >
                  {todo.title}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  sx={{
                    display: "inline",
                    color: "secondary.dark",
                    fontSize: "14px",
                  }}
                  component="span"
                  variant="body2"
                >
                  {stringifiedStartDate} - {stringifiedEndDate}
                </Typography>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      {/* <Divider color="white" /> */}
    </div>
  );
};

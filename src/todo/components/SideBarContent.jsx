import { Add, ListAlt } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useTodoStore, useUiStore } from "../../hooks";
import { SideBarList } from "./SideBarList";

export const SideBarContent = () => {
  const { navbarHeight, openModal } = useUiStore();

  const { todosStatus } = useTodoStore();

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <>
      <Grid
        container
        sx={{
          height: `${navbarHeight}px`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} p={1}>
          <Button
            onClick={handleOpenModal}
            fullWidth
            variant="outlined"
            color="info"
            startIcon={<Add />}
          >
            Add todo
          </Button>
        </Grid>
      </Grid>
      <Divider color="white" />
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
              <CircularProgress
                sx={{ color: "secondary.main" }}
              />
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

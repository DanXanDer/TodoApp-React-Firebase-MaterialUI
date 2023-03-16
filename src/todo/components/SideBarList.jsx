import { Add, Inbox, Mail } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useUiStore } from "../../hooks";

export const SideBarList = () => {

  const { navbarHeight, openModal } = useUiStore();

  const handleOpenModal = () => {
    openModal();
  }

  return (
    <div>
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
            variant="contained"
            color="success"
            startIcon={<Add />}
          >
            Add new todo
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

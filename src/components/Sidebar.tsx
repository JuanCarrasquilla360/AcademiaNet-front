import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ListItemIcon } from "@mui/material";
import { useThemeContext } from "../ThemeContext";
import {
  IconBook,
  IconCalendar,
  IconSchool,
  IconTextPlus,
} from "@tabler/icons-react";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const { isAuthenticated, userRole } = useAuth();
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          top: "70px",
          backgroundColor: "var(--color-background-000)",
        },
      }}
    >
      <List sx={{ px: 1 }}>
        {(userRole === "Admin" || userRole === "User") && (
          <ListItem
            sx={{
              bgcolor: "var(--color-background-100)",
              mb: 1,
              borderRadius: 1,
            }}
            button
            component={Link}
            to="/institution"
          >
            <ListItemIcon>
              <IconSchool />
            </ListItemIcon>
            <ListItemText
              sx={{ color: isDarkMode ? "#fff" : "#5715c2" }}
              primary={t("institutions")}
            />
          </ListItem>
        )}
        {userRole === "Admin" && (
          <ListItem
            sx={{
              bgcolor: "var(--color-background-100)",
              mb: 1,
              borderRadius: 1,
            }}
            button
            component={Link}
            to="/enrollment-period"
          >
            <ListItemIcon>
              <IconCalendar />
            </ListItemIcon>
            <ListItemText
              sx={{ color: isDarkMode ? "#fff" : "#5715c2" }}
              primary={t("enrollmentPeriods")}
            />
          </ListItem>
        )}
        {isAuthenticated && (
          <ListItem
            sx={{
              bgcolor: "var(--color-background-100)",
              mb: 1,
              borderRadius: 1,
            }}
            button
            component={Link}
            to="/academic-programs"
          >
            <ListItemIcon>
              <IconBook />
            </ListItemIcon>
            <ListItemText
              sx={{ color: isDarkMode ? "#fff" : "#5715c2" }}
              primary={t("academicPrograms")}
            />
          </ListItem>
        )}
        {(userRole === "Admin" || userRole === "User") && (
          <ListItem
            sx={{
              bgcolor: "var(--color-background-100)",
              mb: 1,
              borderRadius: 1,
            }}
            button
            component={Link}
            to="/academic-exams"
          >
            <ListItemIcon>
              <IconTextPlus />
            </ListItemIcon>
            <ListItemText
              sx={{ color: isDarkMode ? "#fff" : "#5715c2" }}
              primary={t("academicExams")}
            />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;

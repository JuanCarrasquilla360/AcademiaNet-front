// src/components/Sidebar.tsx
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Collapse, ListItemIcon } from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import data from "../constants/data_resp.json";
import { useThemeContext } from "../ThemeContext";
import { IconBook, IconCalendar, IconSchool, IconTextPlus } from "@tabler/icons-react";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [openProjects, setOpenProjects] = useState(false);
  const { isDarkMode } = useThemeContext();

  const handleProjectsClick = () => {
    setOpenProjects(!openProjects);
  };
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
        {/* <ListItem button component={Link} to="/admin">
          <ListItemText primary={t("admin")} />
        </ListItem> */}
        {/* {isAuthenticated && (
          <>
            <ListItem button onClick={handleProjectsClick}>
              <ListItemText
                primary={`${t("Contratos Interadministrativos")}`}
              />
              {openProjects ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openProjects} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {data.contratos.map((item) => (
                  <ListItem
                    button
                    component={Link}
                    to={`/contrato/${item.redirect}`}
                    key={item.project_id}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={item.menu_title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )} */}
      </List>
    </Drawer>
  );
};

export default Sidebar;

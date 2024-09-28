import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import { useThemeContext } from "../ThemeContext"; // Asegúrate de tener el contexto del tema

const Layout: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode } = useThemeContext(); // Usamos el contexto para saber si está en modo oscuro

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: isDarkMode
          ? "var(--color-background-000)"
          : "var(--color-background-100)",
        color: "var(--color-text-100)",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Header toggleSidebar={toggleSidebar} />
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          style={{
            flexGrow: 1,
            marginLeft: sidebarOpen ? "0px" : "-240px",
            transition: "margin-left 0.3s ease",
            marginTop: "74px",
            backgroundColor: "var(--color-background-000)",
          }}
        >
          <Box
            component={"div"}
            sx={{ margin: 4 }}
            border={"0px solid var(--color-border-100)"}
            borderRadius={2}
            bgcolor="var(--color-background-100)"
            style={{
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <Box component={"div"} sx={{ padding: 4 }}>
              <Outlet />
            </Box>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default Layout;

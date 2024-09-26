// src/components/Layout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box
            component={"div"}
            sx={{ margin: 4 }}
            border={"0px solid #aaa"}
            borderRadius={2}
            bgcolor={"#fff"}
          >
            <Box
              component={"div"}
              sx={{ padding: 4 }}
            >
              <Outlet />
            </Box>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default Layout;

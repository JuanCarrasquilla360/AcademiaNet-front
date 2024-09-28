// src/components/Header.tsx
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import itmLogo from "../assets/image.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { CssBaseline } from "@mui/material";
import { useThemeContext } from "../ThemeContext.tsx";
interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const { isAuthenticated, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleLogin = () => {
    if (login(username, password)) {
      setOpen(false);
      setError("");
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,bgcolor:"#5715c2" }}
      
    >
      <Toolbar>
        <Box>
          <img src={itmLogo} alt="" height={70} />
        </Box>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <LanguageSwitcher/>
        <Box sx={{ padding: 2 }}>
          <CssBaseline />
          <Button variant="contained" onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </Box>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            {t("logout")}
          </Button>
        ) : (
          <Button color="inherit" onClick={() => setOpen(true)}>
            {t("login")}
          </Button>
        )}
      </Toolbar>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component={"form"}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Header;

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import itmLogo from "../assets/Academia_net.svg";
import LanguageSwitcher from "./LanguageSwitcher";
import { CssBaseline, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { useThemeContext } from "../ThemeContext.tsx";
import { IconMoon, IconSun } from "@tabler/icons-react";
import LoginModal from "./LoginModal.tsx";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, email } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Estado para manejar el menú de usuario
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    logout();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "var(--color-main-150)",
      }}
    >
      <Toolbar>
        <Box>
          <img src={itmLogo} alt="" width={200} />
        </Box>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ ml: 1, visibility: isAuthenticated ? "visible" : "hidden" }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <LanguageSwitcher />
        <Box sx={{ padding: 2 }}>
          <CssBaseline />
          <Button
            onClick={toggleTheme}
            sx={{
              backgroundColor: "#fff!important",
              "&:hover": {
                backgroundColor: "initial",
              },
              color: "var(--color-main-150)",
            }}
          >
            {!isDarkMode ? <IconMoon /> : <IconSun />}
          </Button>
        </Box>

        {isAuthenticated ? (
          <>
            {/* Botón con avatar de usuario */}
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar
                alt="User Avatar"
                src="/path/to/user/avatar.png" // Aquí puedes poner la ruta a la imagen del usuario
              />
            </IconButton>

            {/* Menú que se abre al hacer clic en el avatar */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box sx={{ p: 2, textAlign: "center" }}>
                {/* Información del usuario */}
                <Avatar
                  alt="User Avatar"
                  src="/path/to/user/avatar.png"
                  sx={{ width: 56, height: 56, margin: "auto" }}
                />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {`${t("hi")}, ${email}`}
                </Typography>
              </Box>
              <Divider />
              {/* Link para editar perfil */}
              <MenuItem onClick={() => navigate("/edit-user")}>
                {t("editProfile")}
              </MenuItem>
              {/* Link para cerrar sesión */}
              <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => setOpen(true)}>
            {t("login")}
          </Button>
        )}
      </Toolbar>
      {open && <LoginModal open={open} handleClose={() => setOpen(false)} />}
    </AppBar>
  );
};

export default Header;

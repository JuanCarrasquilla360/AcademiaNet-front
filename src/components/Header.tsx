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
import { CssBaseline } from "@mui/material";
import { useThemeContext } from "../ThemeContext.tsx";
import { IconMoon, IconSun } from "@tabler/icons-react";
import LoginModal from "./LoginModal.tsx";
interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    logout();
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
          sx={{ ml: 1 }}
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
          <Button color="inherit" onClick={handleLogout}>
            {t("logout")}
          </Button>
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

// src/pages/Home.tsx
import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";

const Home: FC = () => {
  const { t } = useTranslation();
  const { username, isAuthenticated } = useAuth();
  const [usenameShow, setUsenameShow] = useState(username);
  useEffect(() => {
    setUsenameShow(username);
  }, [username, isAuthenticated]);

  return (
    <Box>
      <Typography>{`${
        t("welcome") + ", " + usenameShow || "guest"
      }!`}</Typography>
    </Box>
  );
};

export default Home;

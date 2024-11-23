import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import accountsRepository from "../../repositories/accountsRepository";
import { useSnackbar } from "notistack";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userId = searchParams.get("userid");
  const token = searchParams.get("token");

  const handleConfirm = async () => {
    await accountsRepository(`ConfirmEmail`).get(
      { userId, token },
      enqueueSnackbar,
      t("emailConfirmed")
    );
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" mb={2}>
        {t("confirmationEmail")}
      </Typography>
      <Typography variant="body1" color="gray" mb={4}>
        {t("confirmationEmailMsg")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        sx={{ padding: "10px 20px" }}
      >
        {t("confirmationEmail")}
      </Button>
    </Box>
  );
};

export default ConfirmEmail;

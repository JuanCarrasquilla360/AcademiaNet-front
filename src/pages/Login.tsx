import { Box, Grid } from "@mui/material";
import logoEdu from "../assets/image.png";
import logoAlcaldia from "../assets/image.png";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Box>
      <Grid container display={"flex"} flexDirection={"column"}>
        <Grid
          item
          height={"30vh"}
          sx={{
            backgroundColor: "#E86924",
            justifyContent: "center",
            alignItems: "center",
          }}
          display={"flex"}
        >
          <img src={logoEdu} alt="" width={"200px"} />
        </Grid>
        <Grid item height={"50vh"}>
          <LoginForm />
        </Grid>
        <Grid item height={"20vh"} display={"flex"} justifyContent={"center"}>
          <Box
            component={"div"}
            bgcolor={"#E86924"}
            height={"100%"}
            sx={{
              backgroundColor: "#E86924",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "15px 15px 0px 0px",
            }}
            display={"flex"}
            width={"90%"}
          >
            <img src={logoAlcaldia} alt="" width={"150px"} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

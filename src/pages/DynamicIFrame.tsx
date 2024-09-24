import { Box } from "@mui/material";
import defaultBg from "../assets/image.png";

const DynamicIFrame = () => {
  return (
    <Box
      component={"img"}
      src={defaultBg}
      sx={{ objectFit: "contain" }}
      height={"100%"}
    />
  );
};

export default DynamicIFrame;

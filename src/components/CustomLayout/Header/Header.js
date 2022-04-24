import { Box } from "@mui/material";
import MetaMaskAuth from "./components/MetaMaskAuth";

const Header = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <MetaMaskAuth />
    </Box>
  );
};

export default Header;

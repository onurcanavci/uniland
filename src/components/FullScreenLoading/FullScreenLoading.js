import { Backdrop, CircularProgress } from "@mui/material";

const FullScreenLoading = () => {
  return (
    <Backdrop open>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default FullScreenLoading;

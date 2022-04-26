import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

import CustomLand from "../../components/CustomLand";
import { customContract } from "../../contracts/contractUtils";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [grid, setGrid] = useState(null);
  const [landName, setLandName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    try {
      customContract
        .land_size()
        .then((response) =>
          setGrid({ cells: response.toNumber(), rows: response.toNumber() })
        );
    } catch (e) {
      console.log("e: ", e);
    } finally {
      setIsLoading(false);
    }

    try {
      customContract.name().then((response) => setLandName(response));
    } catch (e) {
      setLandName(null);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        {landName !== "" && landName !== null && (
          <Typography>{landName}</Typography>
        )}
        {landName === "" && <CircularProgress />}
      </Box>
      <Box>{grid !== null && <CustomLand grid={grid} />}</Box>
    </Container>
  );
};

export default Home;

import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import CustomSubland from "../../components/CustomSubland";
import { customContract } from "../../constants/contractAbi";

const LandDetail = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [grid, setGrid] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      customContract.lands(location.state.id).then((response) => {
        setGrid({
          cells: response.subland_size.toNumber(),
          rows: response.subland_size.toNumber(),
        });
      });
    } catch (e) {
      console.log("e: ", e);
    } finally {
      setIsLoading(false);
    }
  }, [location.state.id, isLoading]);

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <Container>
      <Box>
        {grid !== null && (
          <CustomSubland mainLandId={location.state.id} grid={grid} />
        )}
      </Box>
    </Container>
  );
};

export default LandDetail;

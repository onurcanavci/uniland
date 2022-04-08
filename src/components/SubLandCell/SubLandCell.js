import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { customContract } from "../../constants/contractAbi";

const SubLandCell = ({ mainLandId, id, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [landName, setLandName] = useState("");

  useEffect(() => {
    console.log("object");
    try {
      customContract
        .sublands(mainLandId, id)
        .then((response) => {
          setLandName(response.name);
          setIsLoading(false);
        })
        .catch((e) => console.log("e: ", e));
    } catch (e) {
      setIsLoading(false);
      setLandName(null);
    }
  }, [mainLandId, isLoading, landName, id]);

  return (
    <Box
      key={id}
      sx={{
        width: 84,
        height: 50.75,
        border: 1,
        borderRadius: "4px",
      }}
    >
      {isLoading && (
        <Box
          sx={{ minWidth: "64px", borderRadius: "4px", padding: "4px 10px" }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Tooltip title={landName}>
          <Button
            variant={landName ? "contained" : "outlined"}
            size='small'
            style={{ margin: "10px" }}
            onClick={() => onClick(mainLandId, id)}
          >
            {landName ? "F" : "E"}
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};

export default SubLandCell;

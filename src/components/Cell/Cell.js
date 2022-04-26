import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import { customContract } from "../../constants/contractAbi";
import { UserContext } from "../../App";

const Cell = ({ id, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [landName, setLandName] = useState("");
  const [ownerOfCell, setOwnerOfCell] = useState(false);
  const { userAddress } = useContext(UserContext);

  useEffect(() => {
    try {
      customContract.lands(id).then((response) => {
        setLandName(response.name);
        setIsLoading(false);
      });
    } catch (e) {
      setLandName(null);
    }
  }, []);

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
            color={ownerOfCell ? "success" : "primary"}
            style={{ margin: "10px" }}
            onClick={() => onClick(id)}
          >
            {landName ? "F" : "E"}
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};

export default Cell;

import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@mui/material";
import SubLandCell from "../SubLandCell";

const CustomSubland = ({ mainLandId, grid }) => {
  const history = useHistory();
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  const handleSeeDetail = (mainLandId, sublandId) => {
    history.push({
      pathname: `subland-detail`,
      state: { mainLandId, sublandId },
    });
  };
  return (
    <Box sx={{ padding: "10px" }}>
      {rows.map((row, index1) => (
        <ul className='row' key={index1}>
          {cells.map((cell, index2) => (
            <SubLandCell
              id={index1 * grid.cells + index2}
              mainLandId={history.location.state.id}
              onClick={(mainLandId, subLandId) =>
                handleSeeDetail(mainLandId, subLandId)
              }
            />
          ))}
        </ul>
      ))}
    </Box>
  );
};

export default CustomSubland;

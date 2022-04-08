import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Cell from "../Cell";

const CustomLand = ({ grid }) => {
  const history = useHistory();

  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  const handleSeeDetail = (id) => {
    history.push({ pathname: `/land-detail`, state: { id } });
  };

  return (
    <Box sx={{ padding: "10px" }}>
      {rows.map((row, index1) => (
        <ul className='row' key={index1}>
          {cells.map((cell, index2) => (
            <Cell
              id={index1 * grid.cells + index2}
              onClick={(id) => handleSeeDetail(id)}
            />
          ))}
        </ul>
      ))}
    </Box>
  );
};

export default CustomLand;

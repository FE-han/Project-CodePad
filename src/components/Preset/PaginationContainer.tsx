import { makeStyles } from "@mui/styles";
import testImage from "../../assets/testImage.png";
import { PresetImageColors } from "../../utils/CommonStyle";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

const PaginationStyles = makeStyles({
  root: {
    margin: `0px auto`,
  },
});

const PaginationContainer = () => {
  const classes = PaginationStyles();
  return (
    <div className={classes.root}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
};

export default PaginationContainer;

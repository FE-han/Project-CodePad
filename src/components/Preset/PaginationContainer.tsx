import { makeStyles } from "@mui/styles";
import testImage from "../../assets/testImage.png";
import { PresetImageColors } from "../../utils/CommonStyle";
import Pagination from "@mui/material/Pagination";
import React,{ useState } from "react";
import {PresetListElement} from '../../pages/MyPresetsPage/utils/types'
import usePagination from '../../components/Preset/usePagination'

const PaginationStyles = makeStyles({
  root: {
    margin: `0px auto`,
  },
});

const PaginationContainer = (props:{presetList: Array<PresetListElement>;}) => {
  const classes = PaginationStyles();


  const [page,setPage] = React.useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(props.presetList.length/PER_PAGE);
  const _DATA = usePagination(props.presetList, PER_PAGE);
  console.log(props.presetList.length/PER_PAGE)

    const handleChange = (e:any,p:any) => {
    setPage(p);
    _DATA.jump(p);
  }

  return (
    <div className={classes.root}>
      <Pagination count={count} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
    </div>
  );
};

export default PaginationContainer;

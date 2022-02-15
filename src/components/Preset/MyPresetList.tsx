import { makeStyles } from "@mui/styles";
import testImage from "../../assets/testImage.png";
import {Link} from 'react-router-dom';
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "@mui/material/Pagination";
import usePagination from '../../api/Pagination';
import {
  PresetListBtnColors,
  PresetImageColors,
} from "../../utils/CommonStyle";

import Reaction from "./Reaction";
import { articleActions } from "../../modules/slice/articleSlice";

const PresetsListStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "23px 30px",
  },
  presetImage: {
    margin: `0 auto`,

    "& > img": {
      width: "200px",
      height: "200px",
      boxShadow: PresetImageColors.SHADOW,
    },
  },
  listBox: {
    marginTop: "8px",
  },

  presetList: {
    "& > div": {
      border: `1px solid ${PresetListBtnColors.COLOR}`,
      margin: "10px 0",

      "&.Mui-selected": {
        backgroundColor: "white",
        border: "1px solid white",
        boxShadow: PresetListBtnColors.SHADOW,
      },
      "&.Mui-selected:hover": {
        backgroundColor: PresetListBtnColors.HOVER,
        border: "1px solid white",
      },
      "&:hover": {
        backgroundColor: PresetListBtnColors.HOVER,
        border: "1px solid white",
      },

      "& > div > span": {
        color: PresetListBtnColors.COLOR,
        fontWeight: "600",
      },
    },
  },
  createBtn: {
    textAlign: "center",
  },
  pagination: {
    margin: `0px auto`,
  },
});
export default function PresetToggleButton(props:any) {
  console.log(props.board)
  const classes = PresetsListStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [page,setPage] = React.useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(props.board.length/PER_PAGE);
  const _DATA = usePagination(props.board, PER_PAGE);

  const handleChange = (e:any,p:any) => {
    setPage(p);
    _DATA.jump(p);
  }
  
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: any,
  ) => {
    setSelectedIndex(index);
    console.log(index);
    console.log(index.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.location.href = `${index.id}`
  };

  return (
    <div className={classes.root}>
      <div className={classes.presetImage}>
        <img src={testImage} alt="" />
      </div>
      <div className={classes.listBox}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          className={classes.presetList}
        >
          <ListItemButton
            selected={selectedIndex === 0}
            // onClick={(event) => handleListItemClick(event, 0)}
            component={Link} to='/mypresets/create'
          >
            <ListItemText primary="+" className={classes.createBtn} />
          </ListItemButton>
          {_DATA.currentData().map((article:any) => (
            <ListItemButton
              selected={selectedIndex === article}
              onClick={(event) => handleListItemClick(event, article)}
            >
              <ListItemText primary={article.title} />
              <Reaction></Reaction>
            </ListItemButton>
          ))}
          {/* {props.board.map((article:any) => (
            <ListItemButton
              selected={selectedIndex === article}
              onClick={(event) => handleListItemClick(event, article)}
            >
              <ListItemText primary={article.title} />
              <Reaction></Reaction>
            </ListItemButton>
          ))} */}
        </List>
      </div>
      <div className={classes.pagination}>
        <Pagination count={count} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
}

import { makeStyles } from "@mui/styles";
import testImage from "../../assets/testImage.png";

import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Pagination from "@mui/material/Pagination";
import {
  PresetListBtnColors,
  PresetImageColors,
} from "../../utils/CommonStyle";

import Reaction from "./Reaction";

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
export default function PresetToggleButton() {
  const classes = PresetsListStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
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
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="+" className={classes.createBtn} />
          </ListItemButton>
          {[1, 2, 3, 4, 5].map((value) => (
            <ListItemButton
              selected={selectedIndex === value}
              onClick={(event) => handleListItemClick(event, value)}
            >
              <ListItemText primary="presetTitle" />
              <Reaction></Reaction>
            </ListItemButton>
          ))}
        </List>
      </div>
      <div className={classes.pagination}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
}

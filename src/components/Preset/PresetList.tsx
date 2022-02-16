import * as React from "react";
import { useNavigate } from "react-router";

import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Reactions from "../PresetCommunity/Reactions";
import { PresetListBtnColors } from "../../utils/CommonStyle";

const PresetsListStyles = makeStyles({
  listBox: {},

  presetList: {
    "& > div": {
      border: `1px solid ${PresetListBtnColors.COLOR}`,
      marginTop: "10px",

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

      "& > div > .MuiTypography-root": {
        color: PresetListBtnColors.COLOR,
        fontWeight: "600",
      },
    },
  },
  createBtn: {
    textAlign: "center",
  },
});
export default function PresetList(props: { createBtn: Boolean }) {
  const classes = PresetsListStyles();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.listBox}>
      <List component="nav" className={classes.presetList}>
        {props.createBtn ? (
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => {
              navigate("/mypresets/create");
              handleListItemClick(event, 0);
            }}
          >
            <ListItemText primary="+" className={classes.createBtn} />
          </ListItemButton>
        ) : (
          ""
        )}

        {[1, 2, 3, 4, 5].map((value) => (
          <ListItemButton
            selected={selectedIndex === value}
            onClick={(event) => handleListItemClick(event, value)}
          >
            <ListItemText primary="presetTitle" />
            <Reactions></Reactions>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

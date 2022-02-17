import * as React from "react";
import { useNavigate, useParams } from "react-router";

import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Reactions from "../PresetCommunity/Reactions";
import { PresetListBtnColors } from "../../utils/CommonStyle";
import { useState } from "react";
import usePagination from "../../components/Preset/usePagination";
import { PresetListElement } from "../../pages/MyPresetsPage/utils/types";

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
export default function PresetList(props: {
  createBtn: Boolean;
  presetList: Array<PresetListElement>;
}) {
  const classes = PresetsListStyles();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const presetId = useParams();

  //presetList 값을 가져올수 있게 되었음!

  // console.log(presetId)
  // const [ page, setPage ] = React.useState(1);
  // const PER_PAGE = 5;
  // console.log(props.userInfo)
  // const count = Math.ceil(props.userInfo.length/PER_PAGE);
  // const _DATA = usePagination(props.userInfo, PER_PAGE);

  // const handleChange = (e:any,p:any) => {
  //   setPage(p);
  //   _DATA.jump(p);
  // }

  // const handleListItemClick = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   index: number
  // ) => {
  //   setSelectedIndex(index);
  // };

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

        {_DATA.currentData().map((value: any) => (
          <ListItemButton
            selected={selectedIndex === value}
            onClick={(event) => handleListItemClick(event, value)}
          >
            <ListItemText primary={value.presetTitle} />
            <Reactions></Reactions>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

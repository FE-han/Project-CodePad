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
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../modules/hooks";
import { ListItemIcon } from "@mui/material";
import PianoIcon from "@mui/icons-material/Piano";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";


const PresetsListStyles = makeStyles({
  listBox: {},
  container: {
    lineHeight: "20px",
    float: "right",
    color: PresetListBtnColors.COLOR,
    fontWeight: "700",
  },
  reactionNum: {
    fontSize: "12px",
    margin: "0px 5px",
  },
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

  const [ page, setPage ] = React.useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(props.presetList.length/PER_PAGE);
  const _DATA = usePagination(props.presetList, PER_PAGE);
  const { presetList, isLoading  } = useAppSelector(
    (state) => state.getMyPresetListSlice
  );

  console.log(props.presetList)

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: any
  ) => {
    setSelectedIndex(index);
    console.log(index);
    //link태그
    // window.location.href = `${index.presetId}`
    
  };

  const handleListClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: any
  ) => {
    setSelectedIndex(index);
    console.log(index);
    //link태그
    window.location.href = `${index.presetId}`
    
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
        

        {_DATA.currentData().map((value: any) => (
          <ListItemButton
            selected={selectedIndex === value}
            onClick={(event) => handleListClick(event, value)}
          >
            <ListItemText primary={value.title} />
            
            <ListItemIcon className={classes.container}>
            <PianoIcon fontSize="small" />
              <span className={classes.reactionNum}>{value.reactions.viewCount}</span>
              <FavoriteIcon fontSize="small" />
              <span className={classes.reactionNum}>{value.reactions.likeCount}</span>
              <CommentIcon fontSize="small" />
              <span className={classes.reactionNum}>{value.reactions.commentCount}</span>
            </ListItemIcon>
          </ListItemButton>
        ))}

      </List>
    </div>
  );
}

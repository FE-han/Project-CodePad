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
  pagenationNavi: {
    display: "flex",
    justifyContent: "center",
  },
});
export interface NowSelectedMyPreset {
  presetId: string;
  reactions?: { viewCount: number; likeCount: number; commentCount: number };
  thumbnailImageURL: string;
  title: string;
}
interface PresetListProps {
  createBtn: Boolean;
  presetList: Array<NowSelectedMyPreset>;
  nowPresetListPage: number;
  setNowPresetListPage: React.Dispatch<React.SetStateAction<number>>;
  // nowSelectedPreset: T
  // setNowSelectedPreset:
}

export default function PresetList({
  createBtn,
  presetList,
  nowPresetListPage,
  setNowPresetListPage,
}: PresetListProps) {
  const classes = PresetsListStyles();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: any,
    element: NowSelectedMyPreset
  ) => {
    setSelectedIndex(index);
    navigate(`/mypresets/${element.presetId}`);
  };

  const handleNowPage = (event: React.ChangeEvent<unknown>, page: number) => {
    setNowPresetListPage(page);
  };

  return (
    <div className={classes.listBox}>
      <List component="nav" className={classes.presetList}>
        {createBtn ? (
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => {
              navigate("/mypresets/create");
            }}
          >
            <ListItemText primary="+" className={classes.createBtn} />
          </ListItemButton>
        ) : (
          ""
        )}

        {presetList.map((element, idx) => {
          return (
            <div key={element.presetId}>
              <ListItemButton
                selected={selectedIndex === idx}
                onClick={(event) => handleListItemClick(event, idx, element)}
              >
                <ListItemText primary={element.title} />

                {element.reactions !== undefined && (
                  <ListItemIcon className={classes.container}>
                    <PianoIcon fontSize="small" />
                    <span className={classes.reactionNum}>
                      {element.reactions.viewCount}
                    </span>
                    <FavoriteIcon fontSize="small" />
                    <span className={classes.reactionNum}>
                      {element.reactions.likeCount}
                    </span>
                    <CommentIcon fontSize="small" />
                    <span className={classes.reactionNum}>
                      {element.reactions.commentCount}
                    </span>
                  </ListItemIcon>
                )}
              </ListItemButton>
            </div>
          );
        })}
      </List>
      <div className={classes.pagenationNavi}>
        <Pagination
          count={5}
          page={nowPresetListPage}
          onChange={(evt) => handleNowPage(evt, nowPresetListPage)}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

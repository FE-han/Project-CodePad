import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { PresetListBtnColors } from "../../utils/CommonStyle";
import Pagination from "@mui/material/Pagination";
import { ListItemIcon } from "@mui/material";
import PianoIcon from "@mui/icons-material/Piano";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { getMyPresetList } from "../../api/PresetList/getMyPresetList";
import { getUserPresetList } from "../../api/PresetList/getUserPresetList";
import { getDefaultPresetList } from "../../api/PresetList/getDefaultPresetList";

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
export interface presetListElement {
  presetId: string;
  reactions?: { viewCount: number; likeCount: number; commentCount: number };
  thumbnailImageURL: string;
  title: string;
}

interface presetListResponse {
  presetList: Array<presetListElement>;
  maxPage: number;
}
interface PresetListProps {
  createBtn: Boolean;
  type: "mypresets" | "userpresets" | "defaultpresets";
  presetId?: string;
}

export default function PresetList({
  createBtn,
  type,
  presetId,
}: PresetListProps) {
  const classes = PresetsListStyles();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [list, setList] = useState<Array<presetListElement>>([]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: any,
    element: presetListElement
  ) => {
    setSelectedIndex(index);
    // navigate(`/${type}/${element.presetId}`);
  };

  const handleNowPage = (event: React.ChangeEvent<unknown>, page: number) => {
    setNowPage(page);
  };

  const getPresetList = async (type: string, page: number) => {
    switch (type) {
      case "mypresets":
        const myRes: presetListResponse = await getMyPresetList({ page });
        setList(myRes.presetList);
        setMaxPage(myRes.maxPage);
        return;

      case "userpresets":
        const userRes: presetListResponse = await getUserPresetList({
          page,
          presetId: presetId || "",
        });
        setList(userRes.presetList);
        setMaxPage(userRes.maxPage);
        return;

      case "defaultpresets":
        const defaultRes: presetListResponse = await getDefaultPresetList({
          page,
        });
        setList(defaultRes.presetList);
        setMaxPage(defaultRes.maxPage);
        return;

      default:
        break;
    }
  };

  useEffect(() => {
    getPresetList(type, nowPage);
  }, [nowPage]);

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

        {list.map((element, idx) => {
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
          count={maxPage}
          page={nowPage}
          onChange={handleNowPage}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

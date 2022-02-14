import {
  ConstructionRounded,
  HdrEnhancedSelectOutlined,
  Translate,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Params, useParams } from "react-router-dom";
import { getPreset } from "../../api/getPreset"; 
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { style } from "@mui/system";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PresetToggleButton from "../../components/Preset/PresetToggleButton";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";
import PresetList from "../../components/Preset/PresetList";
import { PageColors } from "../../utils/CommonStyle";
import MyPresetPage from '../../components/Preset/MypresetPage'
import { articleActions } from "../../modules/slice/articleSlice";
import ArticlePage from "../../components/Preset/ArticlePage";



const MyPresetsPageStyles = makeStyles({
  root: {
    padding: "50px 0px",
    minWidth: "1200px",
  },
  container: {
    margin: "0 auto",
    width: "60%",
    minWidth: "1200px",
    display: "grid",
    gridTemplateRows: "1fr 4fr 2fr",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "comment presetList"`,

    "& > *": {
      backgroundColor: PageColors.BACKGROUND,
      boxShadow: PageColors.SHADOW,
    },
  },
  launchPad: {
    gridArea: "launchPad",
    minHeight: "570px",
  },

  togglePresetBtn: {
    gridArea: "togglePresetBtn",

    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  presetList: {
    gridArea: "presetList",
    minWidth: "460px",
  },
  comment: {
    gridArea: "comment",
    // display: "none",
  },
  communityContainer: {},
});
export function MyPresetsPage() {
  const classes = MyPresetsPageStyles(); 
  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const presetId = useParams();

  console.log(presetId);
  console.log(myPresetData);

  const getInitialData = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    const nowPresetData: Preset = await getPreset(setPresetId(presetId));
    
    console.log(presetId);
    // setDefaultPresetData(newPresetData);

    setPresetData({
      nowPresetData,
      defaultPresetData: myPresetData,
      setDefaultPresetData: setMyPresetData,
    });
  };

  useEffect(() => {
    getInitialData();
  }, []);

 
  return (
    <div className={classes.root}>
      <div className={classes.container}>
      <div className={classes.launchPad}>
        <LaunchPad presetData={myPresetData} />
      </div>
      <div className={classes.togglePresetBtn}>
        <PresetToggleButton />
      </div>
      <div className={classes.presetList}>
        <MyPresetPage />
        <ArticlePage />
      </div>
      <div className={classes.communityContainer}>
        태그, 댓글 등등 기타 커뮤니티 기능 들어올곳
      </div>
      </div>
    </div>
  );
}

export default MyPresetsPage;

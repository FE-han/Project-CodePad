import { makeStyles } from "@mui/styles";

import { useEffect, useState } from "react";

import { getPreset } from "../../api/getPreset";

import LaunchpadHeaderConatiner from "../../components/LaunchPad/LaunchPadHeaderContainer";
import PresetToggleButton from "../../components/Preset/PresetToggleButton";
import PresetList from "../../components/Preset/PresetList";
import PresetImage from "../../components/Preset/PresetImage";
import PaginationContainer from "../../components/Preset/PaginationContainer";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import LaunchPad from "../../components/LaunchPad";

import { ToggleType } from "../../utils/CommonValue";
import { PageColors } from "../../utils/CommonStyle";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";

import {
  ConstructionRounded,
  HdrEnhancedSelectOutlined,
  Translate,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link, Params, useParams } from "react-router-dom";

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

const MyPresetsPageStyles = makeStyles({
  root: {
    height: `calc(100% - 64px)`,
    minWidth: "1020px",
  },
  container: {
    margin: "0 auto",
    padding: "50px 0px",
    width: "60%",
    height: "90%",
    minWidth: "1020px",
    minHeight: "814.5px",

    display: "grid",
    gridTemplateRows: "1fr 4fr 3fr",
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
  changePresets: {
    backgroundColor: "#8E8E8E",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
  },
  listStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#8E8E8E",
    height: "60%",
    width: "100%",
    fontWeight: "medium",
    borderRadius: 1,
  },
  presetListStyles: {
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    fontWeight: "medium",
    paddingBottom: "20px",
    textAlign: "center",
    lineHeight: "50px",
  },

  launchPad: {
    gridArea: "launchPad",
    minHeight: "570px",
    display: "grid",
    alignItems: "center",

    "& > .launchPadContainer": {
      margin: "10px",
      display: "grid",
      rowGap: "10px",
    },
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
    display: "grid",
    alignItems: "center",

    "& > .presetListContainer": {
      display: "flex",
      flexDirection: "column",
      margin: "23px 30px",
    },
  },
  comment: {
    gridArea: "comment",
    // display: "none",
  },
});

export function MyPresetsPage() {
  const classes = MyPresetsPageStyles();

  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const presetId = useParams();

  const getInitialData = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    const nowPresetData: Preset = await getPreset(setPresetId(presetId));
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
      <div className={classes.launchPad}>
        <Link to={"/mypresets/update"}>프리셋 수정 페이지 이동</Link>
        런치패드 올곳
        <LaunchPad presetData={myPresetData} sampleSoundMap={new Map()} />
      </div>
      <div className={classes.togglePresetBtn}>
        <List className={classes.changePresets}>
          <ListItemButton
            component={Link}
            to="/defaultpresets/enter"
            sx={{
              border: "1px solid white",
              width: "50%",
              textAlign: "center",
            }}
          >
            <ListItemText primary="Default presets" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/mypresets"
            sx={{
              border: "1px solid white",
              width: "50%",
              textAlign: "center",
            }}
          >
            <ListItemText primary="My presets" />
          </ListItemButton>
        </List>
      </div>
      <div className={classes.presetList}>
        <div></div>
        <div className={classes.listStyle}>
          <Stack
            className={classes.presetListStyles}
            spacing={2}
            direction="column"
          >
            {/* <Button component={Link} to='/newmypresets' sx={{color:'white', backgroundColor:'#8e8e8e', height:"50px", width:"500px", border:'1px solid white', fontSize:'30px'}}>+</Button> */}
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
                fontSize: "30px",
              }}
            >
              +
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
          </Stack>
        </div>
        <div className={classes.togglePresetBtn}>
          <PresetToggleButton type={ToggleType.myPreset} />
        </div>
        <div className={classes.presetList}>
          <div className="presetListContainer">
            <PresetImage />
            <PresetList createBtn={true} />
            <PaginationContainer />
          </div>
        </div>
        <div className={classes.comment}></div>
      </div>
    </div>
  );
}

export default MyPresetsPage;

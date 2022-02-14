import {
  ConstructionRounded,
  HdrEnhancedSelectOutlined,
  Translate,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
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

const MyPresetsPageStyles = makeStyles({
  root: {
    background: "#4b7a1f",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "150px auto 200px",
    gridColumnGap: "100px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "communityContainer presetList"`,

    "& > *": {
      border: "1px solid gray",
      minWidth: "500px",
    },
  },
  launchPad: {
    gridArea: "launchPad",
  },
  togglePresetBtn: {
    gridArea: "togglePresetBtn",
    backgroundColor: "#8E8E8E",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  changePresets: {
    backgroundColor: "#8E8E8E",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
  },
  presetList: {
    gridArea: "presetList",
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
  plusPresetButtonStyles: {
    width: "100%",
    textAlignLast: "center",
  },
  page: {
    paddingLeft: "90px",
  },
  communityContainer: {},
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
        <div className={classes.page}>
          <Stack spacing={2}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
        </div>
        <PresetToggleButton />
      </div>
      <div className={classes.presetList}>
        프리셋 리스트 올곳
        <Link to={"/mypresets/create"}>나의 새 프리셋 생성 페이지 이동</Link>
        {/* <PresetList /> */}
      </div>
      <div className={classes.communityContainer}>
        태그, 댓글 등등 기타 커뮤니티 기능 들어올곳
      </div>
    </div>
  );
}

export default MyPresetsPage;

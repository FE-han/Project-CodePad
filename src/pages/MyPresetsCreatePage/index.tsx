import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import PresetOptionHandle from "./components/PresetOptionHandle";
import PresetThumbnailUpload from "./components/PresetThumbnailUpload";
import PresetTitle from "./components/PresetTitle";

const MyPresetsCreatePageStyles = makeStyles({
  root: {
    background: "#4b7a1f",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "300px auto 200px",
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
  presetOptionBox: {
    gridArea: "togglePresetBtn",
    display: "flex",
    justifyContent: "space-around",
  },
  presetTitleWrap:{
    width: "30%",
    height: "80%",
    marginTop: "auto",
    marginBottom: "auto",
  },
  presetList: {
    gridArea: "presetList",
  },
  communityContainer: {},
});

export function MyPresetsCreatePage() {
  const classes = MyPresetsCreatePageStyles();
  const [myPresetData, setMyPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );

  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <Link to={"/"}>인트로 페이지 이동버튼</Link>
        런치패드 올곳
        <LaunchPad presetData={myPresetData} />
      </div>
      <div className={classes.presetOptionBox}>
        <PresetThumbnailUpload imgURL={undefined} />
        <div className={classes.presetTitleWrap}>
          <PresetTitle />
          <PresetOptionHandle />
        </div>
      </div>
      <div className={classes.presetList}>
        프리셋 리스트 올곳
        {/* <PresetList /> */}
      </div>
      <div className={classes.communityContainer}>
        태그, 댓글 등등 기타 커뮤니티 기능 들어올곳
      </div>
    </div>
  );
}

export default MyPresetsCreatePage;

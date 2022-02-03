import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import LaunchPad from "../../components/LaunchPad";

const DefaultPresetsPageStyles = makeStyles({
  root: {
    background: "orange",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "150px 350px 200px",
    gridColumnGap: "100px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "none presetList"`,

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
  },
  presetList: {
    gridArea: "presetList",
  },
});

export function DefaultPresetsPage() {
  const classes = DefaultPresetsPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <Link to={"/"}>인트로 페이지 이동버튼</Link>
        <LaunchPad />
      </div>
      <div className={classes.togglePresetBtn}>
        디폴트 프리셋 {"<->"} 마이프리셋 토글 버튼 올곳
        {/* <PresetToggleBtn /> */}
      </div>
      <div className={classes.presetList}>
        프리셋 리스트 올곳
        {/* <PresetList /> */}
      </div>
    </div>
  );
}

export default DefaultPresetsPage;

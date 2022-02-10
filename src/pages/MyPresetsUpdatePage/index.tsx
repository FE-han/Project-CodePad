import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import PresetOptionHandle from "./components/PresetOptionHandle";
import PresetThumbnailUpload from "./components/PresetThumbnailUpload";
import PresetTitle from "./components/PresetTitle";

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
    display: "flex",
    justifyContent: "space-around",
  },
  presetList: {
    gridArea: "presetList",
  },
  communityContainer: {},
});

export function MyPresetsUpdatePage() {
  const classes = MyPresetsPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <Link to={"/"}>인트로 페이지 이동버튼</Link>
        런치패드 올곳
        {/* <LaunchPad /> */}
      </div>
      <div className={classes.togglePresetBtn}>
        <PresetThumbnailUpload imgURL="https://images.mypetlife.co.kr/content/uploads/2019/12/09151959/%EC%8B%AC%EC%8B%AC%ED%95%9C_%EA%B3%A0%EC%96%91%EC%9D%B42.png"/>
        <div>
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

export default MyPresetsUpdatePage;

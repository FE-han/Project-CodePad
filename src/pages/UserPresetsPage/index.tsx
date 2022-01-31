import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const UserPresetsPageStyles = makeStyles({
  root: {
    background: "#3fa1a5",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "150px 350px 200px",
    gridColumnGap: "100px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad userInfo"
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
  userInfo: {
    gridArea: "userInfo",
  },
  presetList: {
    gridArea: "presetList",
  },
  communityContainer: {},
});

export function UserPresetsPage() {
  const classes = UserPresetsPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <Link to={"/intro"}>인트로 페이지 이동버튼</Link>
        런치패드 올곳
        {/* <LaunchPad /> */}
      </div>
      <div className={classes.userInfo}>
        유저정보 올곳
        {/* <UserInfo /> */}
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

export default UserPresetsPage;

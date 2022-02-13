import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const LikePresetsPageStyles = makeStyles({
  root: {
    background: "skyblue",

    margin: "0 auto 0 auto",
    width: "880px",
    height: "100%",
  },
});

export function LikePresetsPage() {
  const classes = LikePresetsPageStyles();
  return (
    <div className={classes.root}>
      좋아요 누른 프리셋 보관함 페이지
      <Link to={"/"}>인트로 페이지 이동버튼</Link>
    </div>
  );
}

export default LikePresetsPage;

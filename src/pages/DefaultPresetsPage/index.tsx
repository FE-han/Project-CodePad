import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const DefaultPresetsPageStyles = makeStyles({
  root: {
    background: "orange",

    margin: "0 auto 0 auto",
    width: "880px",
    height: "100%",
  },
});

export function DefaultPresetsPage() {
  const classes = DefaultPresetsPageStyles();
  return (
    <div className={classes.root}>
      대충 디폴트 프리셋 컴포넌트들 올 곳
      <Link to={"/intro"}>인트로 페이지 이동버튼</Link>
    </div>
  );
}

export default DefaultPresetsPage;

import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const IntroPageStyles = makeStyles({
  root: {
    background: "green",

    margin: "0 auto 0 auto",
    width: "880px",
    height: "100%",
  },
});

export function IntroPage() {
  const classes = IntroPageStyles();
  return (
    <div className={classes.root}>
      대충 인트로 페이지 컴포넌트들 올 곳
      <Link to={"/search"}>검색결과 페이지 이동버튼</Link>
    </div>
  );
}

export default IntroPage;

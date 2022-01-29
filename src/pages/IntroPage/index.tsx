import { makeStyles } from "@mui/styles";

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
    <div className={classes.root}>대충 인트로 페이지 컴포넌트들 올 곳</div>
  );
}

export default IntroPage;

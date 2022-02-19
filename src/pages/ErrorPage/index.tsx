import { makeStyles } from "@mui/styles";
import { Fonts, PageColors } from "../../utils/CommonStyle";

export default function ErrorPage() {
  const classes = ErrorPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span>Error Page</span>
      </div>
      <div className={classes.container}>
        <span> 경로에 없는 페이지 입니다.</span>
      </div>
    </div>
  );
}

const ErrorPageStyles = makeStyles({
  root: {
    backgroundColor: `${PageColors.BACKGROUND}`,
    boxShadow: `${PageColors.SHADOW}`,

    margin: "0 auto 0 auto",
    width: "75%",
    minWidth: "1041px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    alignItems: "center",
    padding: `50px 70px 15px 70px`,

    "& > span": {
      fontSize: "34px",
      fontWeight: "700",
      color: PageColors.COLOR,
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    textAlign: "center",
    padding: "20px",
    height: `calc(100vh - 203px)`,
    overflow: "auto",
  },
});

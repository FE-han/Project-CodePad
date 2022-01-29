import { makeStyles } from "@mui/styles";

const IntroPageStyles = makeStyles({
  root: {
    background: "skyblue",
  },
});

export function IntroPage() {
  const classes = IntroPageStyles();

  return (
    <div className={classes.root}>
      <div>intro</div>
    </div>
  );
}

export default IntroPage;

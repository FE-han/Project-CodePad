import { makeStyles } from "@mui/styles";

const HeaderStyles = makeStyles({
  root: {
    background: "gray",
  },
});
export function Header() {
  const classes = HeaderStyles();

  return (
    <div className={classes.root}>
      <div>header</div>
    </div>
  );
}

export default Header;

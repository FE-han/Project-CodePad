import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const HeaderStyles = makeStyles({
  root: {
    background: "gray",

    display: "flex",
  },
});
export function Header() {
  const classes = HeaderStyles();

  return (
    <div className={classes.root}>
      <Link to={"/intro"}>LOGO</Link>
      <input type="text" placeholder={"검색어를 입력해주세요"} />
      <Link to={"/defaultpreset"}>PRESET</Link>
      <div>LOGIN</div>
    </div>
  );
}

export default Header;

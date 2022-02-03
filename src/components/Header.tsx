import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const HeaderStyles = makeStyles({
  root: {
    background: "gray",

    display: "flex",
    justifyContent: "space-around",
  },
});
export function Header() {
  const classes = HeaderStyles();

  return (
    <div className={classes.root}>
      <Link to={"/"}>LOGO</Link>
      <input type="text" placeholder={"검색어를 입력해주세요"} />
      <button>
        <Link to={"/search"}>검색하기버튼</Link>
      </button>
      <Link to={"/defaultpresets"}>DefaultPresetsLink</Link>
      <Link to={"/userpresets"}>UserPresetsLink</Link>
      <Link to={"/mypresets"}>MyPresetLink</Link>
      <div>LOGIN</div>
      <Link to={"/likePresets"}>MyLikePresets</Link>
    </div>
  );
}

export default Header;

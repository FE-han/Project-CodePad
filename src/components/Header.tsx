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
<<<<<<< HEAD
      <Link to={"/defaultpresets/enter"}>DefaultPresetsLink</Link>
=======
      <Link to={"/defaultpresets"}>DefaultPresetsLink</Link>
>>>>>>> 6a71dea9d30afc113df0337431646915b9fc1a87
      <Link to={"/userpresets"}>UserPresetsLink</Link>
      <Link to={"/mypresets"}>MyPresetLink</Link>
      <div>LOGIN</div>
      <Link to={"/likePresets"}>MyLikePresets</Link>
    </div>
  );
}

export default Header;

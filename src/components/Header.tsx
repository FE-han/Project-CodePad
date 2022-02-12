import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import { LoginModal, ProfileModal } from "./Modal";
import { useState } from "react";

const HeaderStyles = makeStyles({
  root: {
    background: "gray",

    display: "flex",
    justifyContent: "space-around",
  },
});

export function Header() {
  const classes = HeaderStyles();

  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleClickLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleClickProfileOpen = () => {
    setProfileOpen(true);
  };

  const onLoginClose = () => {
    setLoginOpen(false);
  };

  const onProfileClose = () => {
    setProfileOpen(false);
  };

  return (
    <div className={classes.root}>
      <Link to={"/"}>LOGO</Link>
      <input type="text" placeholder={"검색어를 입력해주세요"} />
      <button>
        <Link to={"/search"}>검색하기버튼</Link>
      </button>
      <Link to={"/defaultpresets/enter"}>DefaultPresetsLink</Link>
      <Link to={"/userpresets"}>UserPresetsLink</Link>
      <Link to={"/mypresets"}>MyPresetLink</Link>
      <button onClick={handleClickLoginOpen}>Login</button>
      <LoginModal open={loginOpen} onClose={onLoginClose} />
      <button onClick={handleClickProfileOpen}>Profile</button>
      <ProfileModal open={profileOpen} onClose={onProfileClose} />
      <Link to={"/likePresets"}>MyLikePresets</Link>
    </div>
  );
}

export default Header;

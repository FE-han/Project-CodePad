import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import * as React from "react";
import { makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { headerBgColor, headerBoxShadow } from "../utils/CommonStyle";

export default function Header() {
  const classes = HeaderStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/mypresets/enter");
          handleMenuClose();
        }}
      >
        My Page
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Likes</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ zIndex: 0 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: `${headerBgColor}`,
          boxShadow: `${headerBoxShadow}`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={logo}
            className={classes.logo}
            alt="React"
            onClick={() => {
              navigate("/");
            }}
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                navigate("/defaultpresets/enter");
              }}
            >
              Preset
            </IconButton>
            <div className={classes.borderLine}></div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
  // return (
  //   <div className={classes.root}>
  //     <Link to={"/"} className={`${classes.link} ${classes.logo}`}>
  //       LOGO
  //     </Link>
  //     <input type="text" placeholder={"검색어를 입력해주세요"} />
  //     <button>
  //       <Link to={"/search"} className={classes.link}>
  //         검색하기버튼
  //       </Link>
  //     </button>
  //     <Link to={"/defaultpresets"} className={classes.link}>
  //       DefaultPresetsLink
  //     </Link>
  //     <Link to={"/userpresets"} className={classes.link}>
  //       UserPresetsLink
  //     </Link>
  //     <Link to={"/mypresets"} className={classes.link}>
  //       MyPresetLink
  //     </Link>
  //     <div>LOGIN</div>
  //     <Link to={"/likePresets"} className={classes.link}>
  //       MyLikePresets
  //     </Link>
  //   </div>
  // );
}

const HeaderStyles = makeStyles({
  root: {
    background: "gray",

    display: "flex",
    justifyContent: "space-around",
  },

  logo: {
    width: "120px",
    cursor: "pointer",
  },

  link: {
    textDecoration: "none",
  },

  borderLine: {
    marginLeft: "10px",
    height: "20px",
    borderRight: `2px solid`,
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50ch",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

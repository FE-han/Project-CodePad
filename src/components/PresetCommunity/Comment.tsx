import Avatar from "@mui/material/Avatar";
import testImage from "../../assets/testImage.png";
import { makeStyles } from "@mui/styles";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useState } from "react";

const commentStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    fontSize: "14px",
    position: "relative",
  },
  userName: {
    fontWeight: "600",
  },
});

export default function Comment() {
  const classes = commentStyles();

  const [toggleHover, setToggleHover] = useState(false);

  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    setToggleHover(!toggleHover);
    console.log(toggleHover);
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Avatar alt="user-image" src={testImage} sx={{ width: 24, height: 24 }} />
      <span className={classes.userName}>eundore</span>
      <Divider orientation="vertical" flexItem />
      <span>Good!</span>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: "absolute",
          right: "0px",
          "&.disabled": {
            display: "none",
          },
        }}
        className={!toggleHover ? "disabled" : ""}
      >
        <DeleteIcon />
      </IconButton>

      <IconButton
        aria-label="edit"
        size="small"
        sx={{
          position: "absolute",
          right: "30px",
          "&.disabled": {
            display: "none",
          },
        }}
        className={!toggleHover ? "disabled" : ""}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
}

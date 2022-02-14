import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const label = { inputProps: { "aria-label": "Switch demo" } };

const presetOptionHandleStyles = makeStyles({
  root: {
    "& button": {
      lineHeight: "30px",
      background: "transparent",
      border: "1px solid white",
      borderRadius: "5px",
      color: "white",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
    },
  },
  toggleSwitchWrap: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "end",
    marginTop: "10px",
    marginBottom: "10px",

    "& label": {
      color: "white",
      fontWeight: "bold",
    },
  },

  buttonWrap: {
    display: "flex",
    justifyContent: "space-between",
  },

  saveBtn: {
    width: "45%",
  },
  cancelBtn: {
    width: "45%",
  },
});

export default function PresetOptionHandle() {
  const classes = presetOptionHandleStyles();
  const navigate = useNavigate();

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert("세이브");
  };

  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.toggleSwitchWrap}>
        <label>공개</label>
        <Switch {...label} />
      </div>
      <div className={classes.buttonWrap}>
        <button className={classes.saveBtn} onClick={handleFormSubmit}>
          <SaveIcon sx={{ transform: "translateY(20%)", fontSize: "1.2rem" }} />{" "}
          SAVE
        </button>
        <button className={classes.cancelBtn} onClick={handleCancelClick}>
          <DeleteIcon
            sx={{ transform: "translateY(20%)", fontSize: "1.2rem" }}
          />{" "}
          CANCEL
        </button>
      </div>
    </div>
  );
}

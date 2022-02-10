import { ConstructionRounded, HdrEnhancedSelectOutlined, Translate } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Params, useParams } from "react-router-dom";
import { getPreset } from "../../api/getPreset";
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/types";
import pororo from './pororo.png';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import  ListItemIcon from "@mui/material/ListItemIcon";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListItemText from '@mui/material/ListItemText';
import { grey } from "@mui/material/colors";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { style } from "@mui/system";
import  Grid  from "@mui/material/Grid";

const MyPresetsPageStyles = makeStyles({
  root: {
    background: "#4b7a1f",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "150px auto 200px",
    gridColumnGap: "100px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "communityContainer presetList"`,

    "& > *": {
      border: "1px solid gray",
      minWidth: "500px",
    },
  },
  launchPad: {
    gridArea: "launchPad",
  },
  togglePresetBtn: {
    gridArea: "togglePresetBtn",
    backgroundColor: "#8E8E8E",
    display:"flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  changePresets:{
    backgroundColor: "#8E8E8E",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
  },
  presetList: {
    gridArea: "presetList",
  },
  pororoimage: {
    paddingLeft: "200px",
    paddingTop: "50px",
    paddingBottom: "20px",
    backgroundColor: "#8E8E8E",
  },
  listStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#8E8E8E",
    height: "60%",
    width: "100%",
    fontWeight: 'medium',
    borderRadius: 1,
  },
  presetListStyles:{
    width:"100%",
    maxWidth:"500px",
    height:"100%", 
    display:"flex", 
    alignItems:"center", 
    flexDirection:"column", 
    justifyContent:"space-between",
    fontWeight: 'medium',
  },
  plusPresetButtonStyles:{
    width: "100%", 
    textAlignLast:"center",
  },
  page:{
    paddingLeft: "90px",
  },
  communityContainer: {},
});

export function MyPresetsPage() {
  const classes = MyPresetsPageStyles();
  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <Link to={"/"}>인트로 페이지 이동버튼</Link>
        런치패드 올곳
        {/* <LaunchPad /> */}
      </div>
      <div className={classes.togglePresetBtn}>
        <List className={classes.changePresets}>
          <ListItemButton component={Link} to="/defaultpresets/enter"sx={{border:"1px solid white", width:"50%", textAlign:"center"}}>
            <ListItemText primary="Default presets"/>
          </ListItemButton>
          <ListItemButton component={Link} to="/mypresets" sx={{border:"1px solid white", width:"50%", textAlign:"center"}}>
            <ListItemText primary="My presets"/>
          </ListItemButton>
        </List>
      </div>
      <div className={classes.presetList}>
        <div className={classes.pororoimage}>
          <img src={pororo} width="55%" height="100%"/>
        </div>
        <div className={classes.listStyle}>
          <List className={classes.presetListStyles}>
              <ListItemButton component={Link} to="/mypresets" className={classes.plusPresetButtonStyles} sx={{border: "1px solid white"}}>
                <ListItemText>+</ListItemText>
              </ListItemButton>
              <ListItemButton sx={{width: "100%", border: "1px solid white"}}>
                <ListItemText primary="Tech Housesjfdsjfsj" />
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton sx={{width: "100%", border: "1px solid white"}}>
                <ListItemText primary="sddsfdsfdsfdsfdsfTech House" />
              </ListItemButton>
              <ListItemButton sx={{width: "100%", border: "1px solid white"}}>
                <ListItemText primary="Tech House" />
              </ListItemButton>
              <ListItemButton sx={{width: "100%", border: "1px solid white"}}>
                <ListItemText primary="Tech House" />
              </ListItemButton>
            </List>
        </div>
        <div className={classes.page}>
          <Stack spacing={2}>
            <Pagination count={10} showFirstButton showLastButton/>
          </Stack>
        </div>
      </div>
      <div className={classes.communityContainer}>
        태그, 댓글 등등 기타 커뮤니티 기능 들어올곳
      </div>
    </div>
  );
}

export default MyPresetsPage;

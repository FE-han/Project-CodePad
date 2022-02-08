import { Translate } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Params, useParams } from "react-router-dom";
import { getPreset } from "../../api/getPreset";
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/types";
import pororo from './pororo.png';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { grey } from "@mui/material/colors";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


//스타일은 defaultPresetsPage, MyPresetsPage, UserPresetsPage모두 동일하게 사용하는것이 좋을듯
const DefaultPresetsPageStyles = makeStyles({
  root: {
    background: "orange",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "150px auto 200px",
    gridColumnGap: "100px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "none presetList"`,

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
  },
  presetList: {
    gridArea: "presetList",
  },
  pororoimage: {
    paddingLeft: "200px",
    paddingTop: "80px",
  },
  listStyle: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "gray",
    height: "60%",
    borderRadius: 1,
  },
  page:{
    paddingLeft: "90px",
  }
});

export function DefaultPresetsPage() {
  const classes = DefaultPresetsPageStyles();
  const [defaultPresetData, setDefaultPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const defaultPresetId = useParams();

  const setPresetId = (defaultPresetId: Readonly<Params<string>>) => {
    switch (defaultPresetId.presetId) {
      case "enter":
        return "defaultPreset1";

      case undefined:
        return "defaultPreset1";

      default:
        return defaultPresetId.presetId;
    }
  };
  
  const getInitialData = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    const newPresetData: Preset = await getPreset({
      presetId: setPresetId(defaultPresetId),
    });
    // setDefaultPresetData(newPresetData);

    setNewPresetData(newPresetData);
  };

  const setNewPresetData = (newPresetData: Preset) => {
    const newSoundSampleMap = newPresetData.soundSamples.reduce(
      (newMap, soundSample) => {
        newMap.set(soundSample.location, soundSample);
        return newMap;
      },
      new Map()
    );
    const newSoundSamples = defaultPresetData.soundSamples.map(
      (defaultSoundSample) => {
        const newSoundSampleData = newSoundSampleMap.get(
          defaultSoundSample.location
        );
        if (newSoundSampleData !== undefined) {
          return newSoundSampleData;
        }
        return defaultSoundSample;
      }
    );

    setDefaultPresetData({
      presetTitle: newPresetData.presetTitle,
      presetId: newPresetData.presetId,
      areaSize: newPresetData.areaSize,
      soundSamples: newSoundSamples,
    });
  };

  useEffect(() => {
    getInitialData();
    console.log(defaultPresetData);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <button onClick={() => console.log(defaultPresetData)}></button>
        <LaunchPad presetData={defaultPresetData} />
      </div>
      <div className={classes.togglePresetBtn}>
        디폴트 프리셋 {"<->"} 마이프리셋 토글 버튼 올곳!!
        {/* <PresetToggleBtn /> */}
      </div>
      <div className={classes.presetList}>
        <div className={classes.pororoimage}>
          <img src={pororo} width="50%"/>
        </div>
        <div className={classes.listStyle}>
        <List sx={{width:"100%",bgcolor:grey} }>
            <ListItemButton>
              <ListItemText primary="Tech House" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Tech House" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Tech House" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Tech House" />
            </ListItemButton>
          </List>
        </div>
        <div className={classes.page}>
          <Stack spacing={2}>
            <Pagination count={10} showFirstButton showLastButton/>
          </Stack>
        </div>
        {/* <PresetList /> */}
      </div>
    </div>
  );
}

export default DefaultPresetsPage;

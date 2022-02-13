import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import { PageColors } from "../../utils/CommonStyle";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Params, useParams } from "react-router-dom";
import { getPreset, PresetParams } from "../../api/getPreset";
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { Preset, LaunchPadScale } from "../../components/LaunchPad/utils/types";
import { actions } from "../../modules/actions/getPresetSlice";
import { useAppSelector } from "../../modules/hooks";
import { setNewPresetData } from "./setDefaultPresetData";

import PresetToggleButton from "../../components/Preset/PresetToggleButton";
import PresetList from "../../components/Preset/PresetList";
import setPresetData from "../../utils/setPresetData";
import setPresetId from "../../utils/setPresetId";

//스타일은 defaultPresetsPage, MyPresetsPage, UserPresetsPage모두 동일하게 사용하는것이 좋을듯
const DefaultPresetsPageStyles = makeStyles({
  root: {
    margin: "50px auto",
    width: "60%",
    minWidth: "900px",
    height: "83%",

    display: "grid",
    gridTemplateRows: "1fr 4fr 2fr",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "comment presetList"`,

    "& > *": {
      backgroundColor: PageColors.BACKGROUND,
      boxShadow: PageColors.SHADOW,
    },
  },
  launchPad: {
    gridArea: "launchPad",
    minHeight: "570px",
  },

  togglePresetBtn: {
    gridArea: "togglePresetBtn",

    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  presetList: {
    gridArea: "presetList",
    minWidth: "410px",
  },
  comment: {
    gridArea: "comment",
    display: "none",
  },
});

export function DefaultPresetsPage() {
  const classes = DefaultPresetsPageStyles();
  const [defaultPresetData, setDefaultPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const defaultPresetId = useParams();
  const dispatch = useDispatch();
  // const state = useAppSelector((state) => state.getPresetSlice);
  const state = useAppSelector((state) => state);

  const handleGetPreset = async (params: PresetParams) => {
    try {
      const data = await getPreset(params);
      dispatch(actions.getPresetDataFulfilled(data));

      setNewPresetData(data, defaultPresetData, setDefaultPresetData);
    } catch (err) {
      console.log("프리셋 Api에러", err);
      dispatch(actions.getPresetDataRejected());
    }
  };

  const getInitialData = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    const nowPresetData: Preset = await getPreset(setPresetId(defaultPresetId));
    // setDefaultPresetData(newPresetData);

    setPresetData({
      nowPresetData,
      defaultPresetData: defaultPresetData,
      setDefaultPresetData: setDefaultPresetData,
    });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <LaunchPad presetData={defaultPresetData} />
      </div>
      <div className={classes.togglePresetBtn}>
        <PresetToggleButton />
      </div>
      <div className={classes.presetList}>
        <PresetList />
      </div>
      <div className={classes.comment}></div>
    </div>
  );
}

export default DefaultPresetsPage;

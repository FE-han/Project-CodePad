import { makeStyles } from "@mui/styles";

import { PageColors } from "../../utils/CommonStyle";
import { ToggleType } from "../../utils/CommonValue";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPreset, PresetParams } from "../../api/getPreset";
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { Preset, LaunchPadScale } from "../../components/LaunchPad/utils/types";
import { actions } from "../../modules/actions/getPresetSlice";
import { useAppSelector } from "../../modules/hooks";
import { setNewPresetData } from "./setDefaultPresetData";

import LaunchpadHeaderConatiner from "../../components/LaunchPad/LaunchPadHeaderContainer";
import PresetToggleButton from "../../components/Preset/PresetToggleButton";
import PresetList from "../../components/Preset/PresetList";
import setPresetData from "../../utils/setPresetData";
import setPresetId from "../../utils/setPresetId";
import PresetImage from "../../components/Preset/PresetImage";

//스타일은 defaultPresetsPage, MyPresetsPage, UserPresetsPage모두 동일하게 사용하는것이 좋을듯
const DefaultPresetsPageStyles = makeStyles({
  root: {
    height: `calc(100% - 64px)`,
    minWidth: "1200px",
  },
  container: {
    margin: "0 auto",
    padding: "50px 0px",
    width: "60%",
    height: "90%",
    minWidth: "1200px",
    minHeight: "814.5px",

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

    "& > .launchPadContainer": {
      margin: "10px",
      display: "flex",
      flexDirection: "column",
    },
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
    minWidth: "460px",
    display: "grid",
    alignItems: "center",

    "& > .presetListContainer": {
      display: "flex",
      flexDirection: "column",
      margin: "23px 30px",
    },
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
      <div className={classes.container}>
        <div className={classes.launchPad}>
          <div className="launchPadContainer">
            <LaunchpadHeaderConatiner
              title={defaultPresetData.presetTitle}
              onlyFork={true}
            />
            <LaunchPad presetData={defaultPresetData} />
          </div>
        </div>
        <div className={classes.togglePresetBtn}>
          <PresetToggleButton type={ToggleType.default} />
        </div>
        <div className={classes.presetList}>
          <div className="presetListContainer">
            <PresetImage />
            <PresetList createBtn={false} />
          </div>
        </div>
        <div className={classes.comment}></div>
      </div>
    </div>
  );
}

export default DefaultPresetsPage;

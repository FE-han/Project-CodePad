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
    minWidth: "1020px",
  },
  container: {
    margin: "0 auto",
    padding: "50px 0px",
    width: "60%",
    height: "90%",
    minWidth: "1020px",
    minHeight: "814.5px",

    display: "grid",
    gridTemplateRows: "1fr 4fr 3fr",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad togglePresetBtn"
    "launchPad presetList"
    "comment presetList"`,

    ["@media (max-width: 800px)"]: {
      display: "grid",
      gridTemplateRows: "1fr 5fr 2fr 6fr",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridTemplateAreas: `
    "togglePresetBtn"
    "launchPad"
    "comment"
    "presetList"`,
    },

    "& > *": {
      backgroundColor: PageColors.BACKGROUND,
      boxShadow: PageColors.SHADOW,
    },
  },
  launchPad: {
    gridArea: "launchPad",
    minHeight: "570px",
    display: "grid",
    alignItems: "center",

    "& > .launchPadContainer": {
      margin: "10px",
      display: "grid",
      rowGap: "10px",
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
    //display: "none",
  },
});

export function DefaultPresetsPage() {
  const classes = DefaultPresetsPageStyles();
  const [defaultPresetData, setDefaultPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const [sampleSoundMap, setSampleSoundMap] = useState(new Map());
  const defaultPresetId = useParams();
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.getPresetSlice);

  const getInitialData = async () => {
    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    // setDefaultPresetData(newPresetData);

    try {
      const nowPresetData: Preset = await getPreset(
        setPresetId(defaultPresetId)
      );
      dispatch(actions.getPresetDataFulfilled(nowPresetData));
      setPresetData({
        nowPresetData,
        defaultPresetData: defaultPresetData,
        setDefaultPresetData: setDefaultPresetData,
      });

      const currentSampleSoundMap = sampleSoundMap;
      nowPresetData.soundSamples.map((soundSample) => {
        currentSampleSoundMap.set(
          soundSample.location,
          soundSample.soundSampleURL
        );
      });
      setSampleSoundMap(currentSampleSoundMap);
    } catch (err) {
      console.log("프리셋 Api에러", err);
      dispatch(actions.getPresetDataRejected());
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.launchPad}>
          {state.isLoading ? (
            "로딩중"
          ) : (
            <LaunchPad
              presetData={defaultPresetData}
              sampleSoundMap={sampleSoundMap}
            />
          )}
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

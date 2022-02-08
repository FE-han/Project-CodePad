import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Params, useParams } from "react-router-dom";
import { getPreset } from "../../api/getPreset";
import LaunchPad from "../../components/LaunchPad";
import { initialPresetGenerator } from "../../components/LaunchPad/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/types";

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
        디폴트 프리셋 {"<->"} 마이프리셋 토글 버튼 올곳
        {/* <PresetToggleBtn /> */}
      </div>
      <div className={classes.presetList}>
        프리셋 리스트 올곳
        {/* <PresetList /> */}
      </div>
    </div>
  );
}

export default DefaultPresetsPage;

import { makeStyles } from "@mui/styles";
import axios from "axios";
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
  }, []);

  //테스트 공간
  const [file, setFile] = useState<null | File>(null);

  const handleSetFiles = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files === null) {
      console.log("파일이 업로드되지 않았음");
      return;
    }
    const firstFile = evt.target.files[0];
    console.log("선택한 파일", firstFile);

    setFile(firstFile);
  };

  const sendData = async (file: File | null | undefined) => {
    if (file === null || file === undefined) {
      console.log("file을 인식하지 못했음");
      return;
    }

    console.log("파일이 넘어옴", file);

    const formData = new FormData();

    formData.append("audio", file, file.name);

    const res = await axios.post("http://localhost:4100/multer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("axios결과", res);

    setFile(null);
  };

  //

  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <button onClick={() => console.log(defaultPresetData)}></button>
        <LaunchPad presetData={defaultPresetData} />

        <div>
          사운드 셈플 테스트 업로드 공간
          <input
            type="file"
            multiple
            name="audio"
            accept="audio/*"
            onChange={handleSetFiles}
          />
          <button
            onClick={() => {
              sendData(file);
            }}
          >
            사운드 셈플 업로드
          </button>
          <button
            onClick={() => {
              console.log(file);
            }}
          >
            파일 상태 로그찍기
          </button>
        </div>
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

import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPreset } from "../../api/getPreset";
import LaunchPad from "../../components/LaunchPad";

const DefaultPresetsPageStyles = makeStyles({
  root: {
    background: "orange",

    padding: "35px 60px 35px 60px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "150px 350px 200px",
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
  const [defaultPresetData, setDefaultPresetData] = useState({});
  const defaultPresetId = useParams();
  const value = useSelector((state) => state);

  async function asdf() {
    setDefaultPresetData(
      await getPreset({
        presetId: "defaultPreset1",
      })
    );
    console.log(defaultPresetData);
  }

  useEffect(() => {
    console.log(value);

    //일단 초기진입 상태에 대한 param값을 "enter"로 하고 작성
    if (defaultPresetId.presetId === "enter") {
      const nowPresetData = getPreset({
        presetId: "defaultPreset1",
      });
      asdf();
      console.log(nowPresetData);
      setDefaultPresetData(nowPresetData);
      return;
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <LaunchPad />
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

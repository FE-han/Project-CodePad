import { makeStyles } from "@mui/styles";
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
import pororo from "./pororo.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PresetToggleButton from "../../components/PresetToggleButton";
import setPresetData from "../../utils/setPresetData";
import setPresetId from "../../utils/setPresetId";

//스타일은 defaultPresetsPage, MyPresetsPage, UserPresetsPage모두 동일하게 사용하는것이 좋을듯
const DefaultPresetsPageStyles = makeStyles({
  root: {
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
    backgroundColor: "#8E8E8E",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
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
    fontWeight: "medium",
    borderRadius: 1,
  },
  presetListStyles: {
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    fontWeight: "medium",
    paddingBottom: "20px",
    textAlign: "center",
    lineHeight: "50px",
  },
  plusPresetButtonStyles: {
    width: "100%",
    textAlignLast: "center",
  },
  page: {
    paddingLeft: "90px",
  },
  changePresets: {
    backgroundColor: "#8E8E8E",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
  },
  buttonStyles: {
    height: "50px",
    width: "500px",
    color: "white",
    backgroundColor: "gray",
  },
});

export function DefaultPresetsPage() {
  const classes = DefaultPresetsPageStyles();
  const [defaultPresetData, setDefaultPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const defaultPresetId = useParams();
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.getPresetSlice);

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
        {state.isLoading ? (
          "로딩중"
        ) : (
          <LaunchPad presetData={defaultPresetData} />
        )}
      </div>
      <div className={classes.togglePresetBtn}>
        <PresetToggleButton />
      </div>
      <div className={classes.presetList}>
        <div className={classes.pororoimage}>
          <img src={pororo} width="55%" height="100%" />
        </div>
        <div className={classes.listStyle}>
          <Stack
            className={classes.presetListStyles}
            spacing={2}
            direction="column"
          >
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
                fontSize: "30px",
              }}
            >
              +
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
            <div
              style={{
                height: "50px",
                width: "500px",
                border: "1px solid white",
                color: "white",
                backgroundColor: "#8e8e8e",
              }}
            >
              1a2s3d
            </div>
          </Stack>
        </div>
        <div className={classes.page}>
          <Stack spacing={1}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default DefaultPresetsPage;

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

  //default Preset 처음진입시 프리셋 데이터 가져옴
  useEffect(() => {
    dispatch(
      actions.getPresetDataPending({
        //useParams에서(defaultPresetId) 가져올값들
        userId: "inputUserId",
        presetId: "inputPresetId",
      })
    );

    handleGetPreset({
      userId: state.userId,
      presetId: state.presetId,
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.launchPad}>
        <button onClick={() => console.log(state, defaultPresetData)}>
          state값 확인
        </button>
        <LaunchPad presetData={defaultPresetData} />
        {state.isLoading ? "로딩중" : null}
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

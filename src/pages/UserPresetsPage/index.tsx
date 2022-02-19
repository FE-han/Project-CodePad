import { makeStyles } from "@mui/styles";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPreset, PresetParams } from "../../api/getPreset";

import LaunchpadHeaderContainer from "../../components/LaunchPad/LaunchPadHeaderContainer";
import PresetList from "../../components/Preset/PresetList";
import PresetImage from "../../components/Preset/PresetImage";
import PaginationContainer from "../../components/Preset/PaginationContainer";
import { initialPresetGenerator } from "../../components/LaunchPad/utils/initialPresetFormGenerator";
import { LaunchPadScale, Preset } from "../../components/LaunchPad/utils/types";
import LaunchPad from "../../components/LaunchPad";

import { PageColors } from "../../utils/CommonStyle";
import setPresetId from "../../utils/setPresetId";
import setPresetData from "../../utils/setPresetData";

import UserInfo from "./components/UserInfo";
import PresetCommunity from "../../components/PresetCommunity/PresetCommunity";

import { useDispatch } from "react-redux";

import { actions as setNowPresetValueActions } from "../../modules/actions/setNowPresetValueSlice";

import { useAppSelector } from "../../modules/hooks";
import { actions as getPresetActions } from "../../modules/actions/LaunchPad/getPresetSlice";
import { actions as soundButtonsActions } from "../../modules/actions/LaunchPad/soundButtonsSlice";

const UserPresetsPageStyles = makeStyles({
  root: {
    height: `calc(100% - 64px)`,
    minWidth: "1041px",
  },
  container: {
    margin: "0 auto",
    padding: "50px 0px",
    width: "60%",
    height: "90%",
    minWidth: "1041px",
    minHeight: "814.5px",

    display: "grid",
    gridTemplateRows: "1fr 2fr 2fr",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridTemplateAreas: `
    "launchPad UserInfo"
    "launchPad presetList"
    "community presetList"`,

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
    padding: "10px",
  },

  UserInfo: {
    gridArea: "UserInfo",
  },
  presetList: {
    gridArea: "presetList",
    minWidth: "460px",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",

    "& > .presetListContainer": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      width: "93%",
    },
  },
  community: {
    gridArea: "community",
    display: "grid",
    padding: "18px",
    alignItems: "center",
  },
});

type UserPresetsPageParams = {
  userId: any;
};

export function UserPresetsPage() {
  const classes = UserPresetsPageStyles();
  const presetId = useParams();

  const { userId } = useParams<UserPresetsPageParams>();
  const { presetList, isLoading } = useAppSelector(
    (state) => state.getMyPresetListSlice
  );
  const { loginUserId } = useAppSelector(
    (state) => state.setNowLoginUserIdSlice
  );

  const [userPresetData, setUserPresetData] = useState<Preset>(
    initialPresetGenerator(LaunchPadScale.DEFAULT)
  );
  const [sampleSoundMap, setSampleSoundMap] = useState(new Map());
  const urlParams = useParams<{ userId: string; presetId: string }>();
  const dispatch = useDispatch();
  const userPresetPageState = useAppSelector(
    (state) => state.setNowPresetValueSlice
  );
  const state = useAppSelector((state) => state.getPresetSlice);

  const getInitialPresetData = async () => {
    if (!urlParams.userId) {
      throw new Error("urlParams에서 userId를 가져오지 못했습니다.");
    }
    const config: PresetParams = {
      userId: urlParams.userId,
      presetId: urlParams.presetId,
    };
    try {
      const nowPresetData: Preset = await getPreset(config);
      dispatch(getPresetActions.getPresetDataFulfilled(nowPresetData));
      setPresetData({
        nowPresetData,
        defaultPresetData: userPresetData,
        setDefaultPresetData: setUserPresetData,
      });
      dispatch(
        soundButtonsActions.setButtonState({
          soundSamples: nowPresetData.soundSamples,
        })
      );
      const currentSampleSoundMap = sampleSoundMap;
      nowPresetData.soundSamples.map((soundSample) => {
        currentSampleSoundMap.set(
          soundSample.location,
          soundSample.soundSampleURL
        );
      });
      setSampleSoundMap(currentSampleSoundMap);
      dispatch(setNowPresetValueActions.setValueFromPreset(nowPresetData)); //redux에 저장
    } catch (err) {
      console.log("프리셋 Api에러", err);
      dispatch(getPresetActions.getPresetDataRejected());
    }
  };

  useEffect(() => {
    getInitialPresetData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.launchPad}>
          <LaunchpadHeaderContainer
            title={userPresetData.presetTitle}
            onlyFork={true}
            presetId={userPresetData.presetId || "unknownPresetId"}
          />
          {state.isLoading ? (
            "로딩중"
          ) : (
            <LaunchPad
              presetData={userPresetData}
              sampleSoundMap={sampleSoundMap}
            />
          )}
        </div>
        <div className={classes.UserInfo}>
          <UserInfo userId={urlParams.userId || "잘못된UserId"} />
        </div>
        <div className={classes.presetList}>
          <div className="presetListContainer">
            <PresetImage presetList={presetList} selectedPresetId={presetId} />
            <PresetList createBtn={false} presetList={presetList} />
            <PaginationContainer presetList={presetList} />
          </div>
        </div>
        <div className={classes.community}>
          <PresetCommunity />
        </div>
      </div>
    </div>
  );
}

export default UserPresetsPage;

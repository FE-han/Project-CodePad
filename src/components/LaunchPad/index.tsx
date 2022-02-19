import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";

import { Preset } from "./utils/types";
import OneShotButton from "./OneShotButton";
import LoopButton from "./LoopButton";
import EmptyButton from "./EmptyButton";
import Metronome from "./Metronome";
import { useAppSelector } from "../../modules/hooks";
import { getAudioArrayBuffer } from "../../api/getAudioArrayBuffer";
import { actions as soundButtonsActions } from "../../modules/actions/LaunchPad/soundButtonsSlice";
import { actions as loopSoundGroupActions } from "../../modules/actions/LaunchPad/loopSoundGroupSlice";

export const LaunchPadStyles = makeStyles({
  //색깔, 폰트크기들 프로젝트 컬러로 변경해야함
  root: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  },
  btnContainer: {
    display: "grid",
    justifyContent: "space-evenly",

    gridTemplateRows: "repeat(8, 52px)",
    gridTemplateColumns: "repeat(8, 52px)",
    gridGap: "7px",

    margin: "0px 15px",
  },
});

interface LaunchPadProps {
  presetData: Preset;
  sampleSoundMap: Map<string, string>; //<K=location, V=sampleSoundURL>
}

function RenderButtons({ presetData }: Pick<LaunchPadProps, "presetData">) {
  const classes = LaunchPadStyles();

  return (
    <div className={classes.btnContainer}>
      {presetData.soundSamples.map(
        (
          { soundSampleId, soundSampleURL, buttonType, soundType, location },
          idx
        ) => {
          switch (buttonType) {
            case "ONESHOT":
              return (
                <div key={soundSampleId + location}>
                  <OneShotButton
                    soundSampleURL={soundSampleURL}
                    buttonType={buttonType}
                    soundType={soundType}
                    location={location}
                  />
                </div>
              );

            case "LOOP":
              return (
                <div key={soundSampleId + location}>
                  <LoopButton
                    soundSampleURL={soundSampleURL}
                    buttonType={buttonType}
                    soundType={soundType}
                    location={location}
                  />
                </div>
              );

            default:
              return (
                <div key={soundSampleId + location}>
                  <EmptyButton />
                </div>
              );
          }
        }
      )}
    </div>
  );
}

//8x8 scale
export function LaunchPad({ presetData, sampleSoundMap }: LaunchPadProps) {
  const classes = LaunchPadStyles();
  const dispatch = useDispatch();
  const { nowBar, soundGroup, nowPlayingSampleSounds, nowWaitStopSampleSound } =
    useAppSelector((state) => state.loopSoundGroupSlice);
  const [alreadyPlayedSoundSamples, setAlreadyPlayedSoundSamples] = useState(
    new Map()
  );
  const { soundSamples } = useAppSelector(
    (state) => state.soundButtonsStateSlice
  );

  const getBufferSource = async (url: string | undefined, location: string) => {
    if (url === undefined) return;
    const data: ArrayBuffer = await getAudioArrayBuffer(url);

    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(data);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(audioContext.destination);
    source.start();
    dispatch(
      soundButtonsActions.changeButtonState({
        location,
        state: "PLAY",
      })
    );

    return source;
  };

  const stopBufferSource = async (
    btnLocation: string,
    sourcePromise: Promise<AudioBufferSourceNode | undefined>
  ) => {
    if (sourcePromise === undefined) return;
    await sourcePromise.then((res) => {
      if (res === undefined) return;

      // //남은 한 사이클 재생후 정지
      // const context = new AudioContext();
      // setTimeout(() => {
      //   dispatch(
      //     soundButtonsActions.changeButtonState({
      //       location: btnLocation,
      //       state: "STOP",
      //     })
      //   );
      // }, res.buffer!.duration * 1000);
      // res.stop(context.currentTime + res.buffer!.duration);

      //바로정지
      dispatch(
        soundButtonsActions.changeButtonState({
          location: btnLocation,
          state: "STOP",
        })
      );
      res.stop();

      const newPlayedSoundSamples = alreadyPlayedSoundSamples;
      newPlayedSoundSamples.delete(btnLocation);
      setAlreadyPlayedSoundSamples(newPlayedSoundSamples);
    });
  };

  useEffect(() => {
    const newPlayedSoundSamples = alreadyPlayedSoundSamples;

    stopBufferSource(
      nowWaitStopSampleSound,
      alreadyPlayedSoundSamples.get(nowWaitStopSampleSound)
    );
    newPlayedSoundSamples.delete(nowWaitStopSampleSound);

    dispatch(loopSoundGroupActions.clearWaitStopQueue());
    dispatch(
      soundButtonsActions.changeButtonState({
        location: nowWaitStopSampleSound,
        state: "WAIT_STOP",
      })
    );
    setAlreadyPlayedSoundSamples(newPlayedSoundSamples);
  }, [nowWaitStopSampleSound]);

  useEffect(() => {
    soundGroup[nowBar].map((btnLocation) => {
      if (alreadyPlayedSoundSamples.get(btnLocation)) {
      } else {
        const sourcePromise = getBufferSource(
          sampleSoundMap.get(btnLocation),
          btnLocation
        );
        const newPlayedSet = alreadyPlayedSoundSamples;
        newPlayedSet.set(btnLocation, sourcePromise);
        setAlreadyPlayedSoundSamples(newPlayedSet);

        // stopBufferSource(btnLocation, sourcePromise);
      }
    });
  }, [nowBar]);

  useEffect(() => {
    return () => {
      const toStopList = alreadyPlayedSoundSamples;
      console.log(toStopList);

      for (const ele of toStopList.keys()) {
        stopBufferSource(ele, alreadyPlayedSoundSamples.get(ele));
        toStopList.delete(ele);

        dispatch(loopSoundGroupActions.clearWaitStopQueue());
        dispatch(
          soundButtonsActions.changeButtonState({
            location: nowWaitStopSampleSound,
            state: "WAIT_STOP",
          })
        );
      }

      dispatch(loopSoundGroupActions.clearAllPlays());
      // dispatch(soundButtonsActions.resetSampleSoundButtonState());

      console.log("페이지 나감", nowPlayingSampleSounds);
    };
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Metronome />

        <RenderButtons presetData={presetData} />
      </div>
    </>
  );
}

export default LaunchPad;

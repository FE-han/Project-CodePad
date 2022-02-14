import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../modules/actions/loopSoundGroupSlice";
import { useAppSelector } from "../../modules/hooks";

export default function Metronome() {
  const [tempo, setTempo] = useState<number>(112);
  const tempoRef = useRef(tempo);
  tempoRef.current = tempo;

  const handleSetTempo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  const [bar, setBar] = useState<number>(1);
  const barRef = useRef(bar);
  barRef.current = bar;

  const [beat, setBeat] = useState<number>(1);
  const beatRef = useRef(beat);
  beatRef.current = beat;

  const [isStop, setIsStop] = useState<boolean>(true);
  const isStopRef = useRef(isStop);
  isStopRef.current = isStop;

  const [intervalTime, setIntervalTime] = useState<number>(0); //ms
  const intervalTimeRef = useRef(intervalTime);
  intervalTimeRef.current = intervalTime;

  const [delayTime, setDelayTime] = useState<number>(0);
  const delayTimeRef = useRef(delayTime);
  delayTimeRef.current = delayTime;

  const dispatch = useDispatch();
  const { isPlay, soundGroup, nowStagedSampleSounds, nowBar } = useAppSelector(
    (state) => state.loopSoundGroupSlice
  );
  const isPlayRef = useRef(isPlay);
  isPlayRef.current = isPlay;

  const barNumToString = (barNum: number) => {
    switch (barNum) {
      case 1:
        return "bar1";
      case 2:
        return "bar2";
      case 3:
        return "bar3";
      case 4:
        return "bar4";
      case 5:
        return "bar5";
      case 6:
        return "bar6";
      case 7:
        return "bar7";
      case 8:
        return "bar8";

      default:
        return "bar1";
    }
  };

  function metronome() {
    setIntervalTime((60 / tempoRef.current) * 1000);
    const expectedTime = Date.now() + intervalTimeRef.current;

    setTimeout(
      () => {
        setDelayTime(Date.now() - expectedTime);

        if (beatRef.current <= 4) {
          setBeat(beatRef.current + 1);
        }
        if (beatRef.current > 4) {
          setBeat(1);

          if (barRef.current <= 8) {
            setBar(barRef.current + 1);
            dispatch(actions.checkNowBar(barNumToString(barRef.current)));
          }
          if (barRef.current > 8) {
            setBar(1);
            dispatch(actions.checkNowBar("bar1"));
          }
        }
        metronome();
      },
      isPlayRef.current
        ? Math.max(0, intervalTimeRef.current - delayTimeRef.current)
        : 0
    );
  }

  useEffect(() => {
    if (isPlay) {
      metronome();
    }
  }, [isPlay]);

  return (
    <details open>
      <summary>metronome기능</summary>

      <label htmlFor="bpm">BPM : {tempo} </label>
      <input
        type="range"
        id="bpm"
        min={60}
        max={240}
        step={1}
        value={tempo}
        onChange={handleSetTempo}
      />
      <div>tempoTest</div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          onClick={() => {
            console.log({ isPlay, soundGroup, nowStagedSampleSounds, nowBar });
          }}
        >
          reduxValue!
        </button>
        <div>bar: {bar}</div>
        <div>beat: {beat}</div>
        <div>상태: {isStop ? "멈춤" : "재생"}</div>
      </div>
    </details>
  );
}

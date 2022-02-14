import { useEffect, useState } from "react";

export default function Metronome() {
  //박자 맟추기 테스트
  const [tempo, setTempo] = useState<number>(112);
  const handleSetTempo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  const [bar, setBar] = useState<number>(1);
  const [beat, setBeat] = useState<number>(1);
  const [isStop, setIsStop] = useState<boolean>(true);

  //

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        console.log(isStop);
      }, 1000);
    };
    if (isStop) {
      // console.log("정지상태");
    } else {
      // console.log("재생상태");
      const timer = setTimeout(() => {
        console.log(isStop);
      }, 1000);
    }
    // return () => clearTimeout(timer);
  }, [isStop]);

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
            setIsStop(false);
            // const startMetronomeParams: MetronomeParams = {
            //   tempo,
            //   bar,
            //   setBar,
            //   beat,
            //   setBeat,
            //   isStop,
            // };
            // const initialIntervalTime = 0;
            // metronome(startMetronomeParams, initialIntervalTime);
          }}
        >
          start!
        </button>
        <button
          onClick={() => {
            setIsStop(true);
          }}
        >
          stop!
        </button>
        <div>bar: {bar}</div>
        <div>beat: {beat}</div>
        <div>상태: {isStop ? "멈춤" : "재생"}</div>
      </div>
    </details>
  );
}

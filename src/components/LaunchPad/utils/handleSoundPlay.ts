interface SoundPlayParams {
  sound: HTMLAudioElement;
  isPlay: boolean;
  isWait: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWait: React.Dispatch<React.SetStateAction<boolean>>;
}

type LoopButtonState = "STOP" | "WAIT_PLAY" | "PLAY" | "WAIT_STOP";

//로직
// 1. 루프샘플 버튼을 클릭,
// 2-1. (그룹이 비어있을때)메트로눔 포인터를 돌리고, 클릭한 버튼의 루프셈플을 재생그룹에 넣는다
// 2-2. 이때 재생그룹에 넣을때 첫 시작할 bar는 가장 인접한 2의 배수꼴에 배정한다. (음원길이 계산해서 차지하는 bar 공간 계산이 필요할지도?)
// 2-3. 루프샘플의 상태는 (isWait = true, isPlay = false)가 된다
// 3. 메트로눔 포인터가 순차적으로 돌면서 음악이 들어있는 bar에 닿은순간
//    해당 bar에 바인딩 된 루프셈플들을 재생시킨다
//    (isWait = false, isPlay = true)

// 4. 재생중인 루프샘플 버튼을 끄기위해 클릭시 해당 루프셈플을 (isWait = true, isPlay = true)로 바꾼다
// 5. 해당 음원이 종료 되었을때 (isWait = false, isPlay = false)로 바꾸고 재생그룹에서 지운다

// 6. 재생그룹에 등록된 루프셈플이 없을시 메트로눔 포인터는 정지한다.

export const handleLoopSoundPlay = (params: SoundPlayParams) => {
  const { sound, isPlay, isWait, setIsPlay, setIsWait } = params;

  const setCurrentLoopButtonState = ({
    isPlay,
    isWait,
  }: Pick<SoundPlayParams, "isPlay" | "isWait">): LoopButtonState => {
    switch ({ isPlay, isWait }) {
      case { isPlay: false, isWait: false }:
        return "STOP";
      case { isPlay: false, isWait: true }:
        return "WAIT_PLAY";
      case { isPlay: true, isWait: false }:
        return "PLAY";
      case { isPlay: true, isWait: true }:
        return "WAIT_STOP";

      default:
        return "STOP";
    }
  };

  const loopButtonState: LoopButtonState = setCurrentLoopButtonState({
    isPlay,
    isWait,
  });

  if (!isPlay) {
    setIsPlay(true);
    sound.play();
    return;
  }

  if (isPlay) {
  }
};

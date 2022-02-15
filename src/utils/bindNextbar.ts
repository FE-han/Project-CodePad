import { Bar } from "../modules/actions/loopSoundGroupSlice";

export const bindNextbar = (nowBar: Bar) => {
  switch (nowBar) {
    case "bar1":
      return "bar2";
    case "bar2":
      return "bar4";
    case "bar3":
      return "bar4";
    case "bar4":
      return "bar6";
    case "bar5":
      return "bar6";
    case "bar7":
      return "bar8";
    case "bar8":
      return "bar1";

    default:
      return "bar1";
  }
};

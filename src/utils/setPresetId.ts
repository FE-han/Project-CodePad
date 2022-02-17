import { Params } from "react-router";
import { PresetParams } from "../api/getPreset";

export const setPresetId = ({ presetId }: Readonly<Params<string>>) => {
  switch (presetId) {
    case "enter":
      return "Preset1";

    case undefined:
      return "Preset1";

    default:
      return "Preset1";
  }
};

export default setPresetId;

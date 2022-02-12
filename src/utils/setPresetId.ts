import { Params } from "react-router";
import { PresetIdParams } from "../api/getPreset";

export const setPresetId = (defaultPresetId: Readonly<Params<string>>) => {
  const params: PresetIdParams = {
    presetId: "",
  };
  switch (defaultPresetId.presetId) {
    case "enter":
      params.presetId = "defaultPreset1";
      return params;

    case undefined:
      params.presetId = "defaultPreset1";
      return params;

    default:
      params.presetId = defaultPresetId.presetId;
      return params;
  }
};

export default setPresetId;

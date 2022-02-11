import { getPresetList, PresetListparams } from "../../api/getPresetList";

export const makePresetScrollList = async (params: PresetListparams) => {
  try {
    const data = await getPresetList(params);
    return { data, success: true };
  } catch (error) {
    const errorMessage = new Error("Failed...getPresetList API");
    return { errorMessage, success: false };
  }
};

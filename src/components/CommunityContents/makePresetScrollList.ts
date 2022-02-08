import {
  getPresetList,
  프리셋리스트불러오는params,
} from "../../api/getPresetList";

export const makePresetScrollList = async (
  params: 프리셋리스트불러오는params
) => {
  try {
    const res = await getPresetList(params);
    return { res, success: true };
  } catch (error) {
    console.log("에러가 발생했네용");
    return { success: fail };
  }
};

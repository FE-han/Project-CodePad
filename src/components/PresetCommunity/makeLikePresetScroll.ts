import {
  getLikePresetList,
  LikePresetListparams,
} from "../../api/CommunityContents/getLikePresetList";

export const makeLikePresetScroll = async (params: LikePresetListparams) => {
  try {
    const data = await getLikePresetList(params);
    return { data, success: true };
  } catch (error) {
    const errorMessage = new Error("Failed...getLikePresetList API");
    return { errorMessage, success: false };
  }
};

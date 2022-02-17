import {
  getCommentListParams,
  getCommentListAPI,
} from "../../api/Comment/commentListAPI";

export const makeCommentScrollList = async (params: getCommentListParams) => {
  try {
    const data = await getCommentListAPI(params);
    return { data, success: true };
  } catch (error) {
    const errorMessage = new Error("Failed...getPresetList API");
    return { errorMessage, success: false };
  }
};

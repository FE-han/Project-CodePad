import {
  SearchParams,
  getSearchList,
} from "../../api/CommunityContents/getSearchList";

export const makeSearchScrollList = async (params: SearchParams) => {
  try {
    const data = await getSearchList(params);
    return { data, success: true };
  } catch (error) {
    const errorMessage = new Error("Failed...getSearchList API");
    return { errorMessage, success: false };
  }
};

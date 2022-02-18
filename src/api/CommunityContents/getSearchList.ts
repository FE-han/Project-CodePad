import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export interface SearchParams {
  listName: string;
  pageNum: number;
  limitNum: number;
  keyword: string;
}

export async function getSearchList(params: SearchParams) {
  const config: AxiosRequestConfig = {};

  const response = await axiosInstance(config).get(
    `/search?${params.listName}=${params.keyword}&page=${params.pageNum}&limit=${params.limitNum}`
  );
  return response.data;
}

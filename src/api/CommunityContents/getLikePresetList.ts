import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export interface LikePresetListparams {
  pageNum: number;
  limitNum: number;
}

export async function getLikePresetList(params: LikePresetListparams) {
  const config: AxiosRequestConfig = {};

  const response = await axiosInstance(config).get(
    `/likes?page=${params.pageNum}&limit=${params.limitNum}`
  );
  return response.data;
}

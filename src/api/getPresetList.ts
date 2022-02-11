import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface PresetListparams {
  Listname: string;
  pageNum: number;
  limitNum: number;
}

export async function getPresetList(params: PresetListparams) {
  const config: AxiosRequestConfig = {
    //token input
  };

  const response = await axiosInstance(config).get(
    `/${params.Listname}?page=${params.pageNum}&limit=${params.limitNum}`
  );
  return response.data;
}

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export interface PresetListparams {
  Listname: string; //
  pageNum: number;
  limitNum: number;
  presetIds: string;
}

export async function getPresetList(params: PresetListparams) {
  const config: AxiosRequestConfig = {};

  let url = "";

  if (params.presetIds === "") {
    url = `/intro/${params.Listname}?page=${params.pageNum}&limit=${params.limitNum}`;
  } else {
    url = `/intro/${params.Listname}?page=${params.pageNum}&limit=${params.limitNum}&presetIds=${params.presetIds}`;
  }

  const response = await axiosInstance(config).get(url);
  return response.data;
}

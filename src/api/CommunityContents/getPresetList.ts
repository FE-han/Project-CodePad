import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export interface PresetListparams {
  Listname: string;
  pageNum: number;
  limitNum: number;
}

export async function getPresetList(params: PresetListparams) {
  const config: AxiosRequestConfig = {};

  // const data = {
  //   presetId: [`4i85YMVBPsydQGMgGwAF9`, `heqtqdxUB1CCEWfHS91zM`],
  // };
  const response = await axiosInstance(config).get(
    `/intro/${params.Listname}?page=${params.pageNum}&limit=${params.limitNum}`
  );
  return response.data;
}

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface PresetParams {
  userId: string;
  presetId?: string;
}

export async function getPresetInfo(params: any) {
  const config: AxiosRequestConfig = {
    //token input
    baseURL: "http://localhost:4200"
  };
  // const response = await axiosInstance(config).get(
  //   `/launchPad?userId=${params.userId}&PresetId=${params.presetId}`
  // );

  const response = await axiosInstance(config).get(`/presets/1`);

  return response.data;
}

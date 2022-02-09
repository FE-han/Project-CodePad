import { AxiosRequestConfig } from "axios";
import { Preset } from "../components/LaunchPad/types";
import { axiosInstance } from "./axiosInstance";

export interface PresetParams {
  userId: string;
  presetId?: string;
}

export async function getPreset(params: PresetParams) {
  const config: AxiosRequestConfig = {
    //token input
  };
  // const response = await axiosInstance(config).get(
  //   `/launchPad?userId=${params.userId}&PresetId=${params.presetId}`
  // );

  const response = await axiosInstance(config).get(`/launchPad`);

  return response.data;
}

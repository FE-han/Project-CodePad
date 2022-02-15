import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface PresetParams {
    presetId: string;
  }

export async function getPresetInfo(params: any) {
  const config: AxiosRequestConfig = {
    baseURL: "http://localhost:4000"
    //token input
  };

  const response = await axiosInstance(config).get(`/presets/${params.presetId}`);

  return response.data;
}

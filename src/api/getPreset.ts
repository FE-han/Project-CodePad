import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface PresetIdParams {
  presetId: string;
}

export async function getPreset(params: PresetIdParams) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(`/${params.presetId}`);
  return response.data;
}

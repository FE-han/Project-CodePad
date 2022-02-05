import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

interface DefaultPresetIdParams {
  presetId: string;
}

export async function getPreset(params: DefaultPresetIdParams) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(`/${params.presetId}`);
  return response.data;
}

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

interface GetDefaultPresetParams {
  presetId?: string;
}

export async function getDefaultPreset(params: GetDefaultPresetParams) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(
    `/presets/defaultPreset/${params.presetId || ""}`
  );

  return response.data;
}

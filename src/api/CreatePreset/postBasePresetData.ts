import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

interface BasePresetDataResponse {
  presetId: string;
}

export async function postBasePresetData(
  params: FormData
): Promise<BasePresetDataResponse> {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axiosInstance(config).post(
    // "/presets",
    "/presets/defaultpreset",
    params
  );
  return response.data;
}

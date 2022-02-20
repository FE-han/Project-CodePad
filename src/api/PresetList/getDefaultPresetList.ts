import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export interface GetDefaultPresetParams {
  page: number;
  limit?: number;
}

export async function getDefaultPresetList(params: GetDefaultPresetParams) {
  const config: AxiosRequestConfig = {
    //tokeninput
  };

  const response = await axiosInstance(config).get(
    `presets/defaultpresetlist?page=${params.page}&limit=${params.limit || 5}`
  );

  return response.data;
}

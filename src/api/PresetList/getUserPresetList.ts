import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export interface GetUserPresetParams {
  presetId: string;
  page: number;
  limit?: number;
}

export async function getUserPresetList(params: GetUserPresetParams) {
  const config: AxiosRequestConfig = {
    //tokeninput
  };

  const response = await axiosInstance(config).get(
    `presets/${params.presetId}/list?page=${params.page}&limit=${
      params.limit || 5
    }`
  );

  return response.data;
}

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

export interface GetMyPresetParams {
  page: number;
  limit?: number;
}

export async function getMyPresetList(params: GetMyPresetParams) {
  const config: AxiosRequestConfig = {
    //tokeninput
  };

  const response = await axiosInstance(config).get(
    `presets/mypresetlist?page=${params.page}&limit=${params.limit || 5}`
  );

  return response.data;
}

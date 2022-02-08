import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface 프리셋리스트불러오는params {
  Listname: string;
  page: number;
  limit: number;
}

export async function getPresetList(params: 프리셋리스트불러오는params) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(
    `/presetLists?page=${params.page}&limit=${params.limit}`
  );
  return response.data;
}

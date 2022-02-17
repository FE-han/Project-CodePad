import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface GetMyPresetParams {
  userId: string;
}

export async function getMyPresetList(params: GetMyPresetParams) {
  const config: AxiosRequestConfig = {
    //token input
    baseURL: "http://localhost:3001",
  };
  console.log(params);
  const response = await axiosInstance(config).get(
    `/userInfo/userId=${params.userId}`
  );

  return response.data;
}

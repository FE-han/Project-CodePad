import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface UserIdParams {
  userId: string;
}

export async function getUserInfo(params: UserIdParams) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(`/presets/userInfo/${params.userId}`);
  return response.data;
}

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export async function getPresetUserInfo(userId: string) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(`/userInfo/${userId}`);
  return response.data;
}

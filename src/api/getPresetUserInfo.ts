import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function getPresetUserInfo(userId: string) {
  const config: AxiosRequestConfig = {
    //token input
  };
  const response = await axiosInstance(config).get(`/auth/userProfile/${userId}`);
  return response.data;
}

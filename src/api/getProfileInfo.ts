import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function getProfileInfo(accessToken: string) {
  const config: AxiosRequestConfig = {};
  const response = await axiosInstance(config).get(`/auth/userProfile`);
  return response.data;
}

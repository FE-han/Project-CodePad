import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function getProfileInfo(accessToken: string) {
  const config: AxiosRequestConfig = {
    headers: {
      Cookie: `${accessToken}`,
    },
  };
  const response = await axiosInstance(config).get(`/api/auth/userProfile`);
  return response.data;
}

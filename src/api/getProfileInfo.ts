import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function getProfileInfo(accessToken: string) {
  const config: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axiosInstance(config).get(`/auth/userProfile`);
  return response.data;
}

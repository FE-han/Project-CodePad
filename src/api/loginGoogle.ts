import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function loginGoogle() {
  const config: AxiosRequestConfig = {};
  await axiosInstance(config).get(`/auth/google`);
}

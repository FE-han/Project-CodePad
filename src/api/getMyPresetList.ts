import { ViewSidebar } from "@mui/icons-material";
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
  const response = await axiosInstance(config).get(`/userId=${params.userId}`);
  return response.data;
}

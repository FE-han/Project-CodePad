import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

interface editPresetValue {}

export async function editPresetValue(params: any) {
  console.log("editPresetValue Params", params);
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axiosInstance(config).post("/preset/create", params);

  return response.data;
}

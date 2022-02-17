import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";
//${process.env.REACT_APP_SERVER_BASE_URL}
export default async function editProfileInfo(userFormData: FormData) {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosInstance(config).put(
    `/auth/userProfile`,
    userFormData
  );
  return response.data;
}

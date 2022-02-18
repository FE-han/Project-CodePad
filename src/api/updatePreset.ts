import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";
import { formDataTypes } from "../pages/UpdatePresetsPage/index";

export async function updatePreset(params: formDataTypes) {
  
  const formData = new FormData();
  
  formData.append("presetId", params.presetTitle);
  formData.append("PrivacyOption", params.PrivacyOption);
  formData.append("tags", params.tags);
  formData.append("thumbnailImgFile", params.thumbnailImg.thumbnailImgFile);
  formData.append("soundSample", params.soundSample);
  
  const config: AxiosRequestConfig = {
    baseURL: "http://localhost:4200",
    //token input
    headers: {
      'Content-type': 'multipart/form-data',
    }
  };

  return axiosInstance(config).put(`/preset/update/${params.presetId}`, formData).then(res => console.log(res.status))
}

import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface GetTags {
  tagId: string;
}

export async function getTags(params: GetTags) {
  const config: AxiosRequestConfig = {
    baseURL: "http://localhost:3001",
  };

  // console.log(params)

  const response = await axiosInstance(config).get(`/tags=${params.tagId}`);
  return response.data;
}

export interface deleteTagsParams {
  tagId: string;
  text: string;
}

export async function deleteTagsList(params: deleteTagsParams) {
  const config: AxiosRequestConfig = {
    baseURL: "http://localhost:3001",
  };

  const data = {
    data: {
      tagId: params.tagId,
    },
  };
  // console.log(params.tagId)
  const response = await axiosInstance(config).delete(`/tags=1`);

  return response.data;
}

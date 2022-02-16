import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface CommentListparams {
  presetId: string;
  pageNum: number;
  limitNum: number;
}

export async function getCommentListAPI(params: CommentListparams) {
  const config: AxiosRequestConfig = {};

  const response = await axiosInstance(config).get(`/comment`);
  return response.data;
}

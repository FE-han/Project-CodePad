import { CommentData } from "../../../utils/CommonInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommentListState {
  commentList: Array<CommentData>;
  isLoading: boolean;
}

//상태 초기값
const initialState: CommentListState = {
  commentList: [],
  isLoading: false,
};

export const CommentListSlice = createSlice({
  name: "CommentListSlice",

  initialState,

  reducers: {
    getCommentListPending: (
      state,
      action: PayloadAction<Omit<CommentListState, "isLoading">> //액션 실행시 payload로 받아올(=상태값에 부여할) 값
    ) => {
      state.isLoading = true;
    },
    addCommentList: (
      state,
      action: PayloadAction<Omit<CommentListState, "isLoading">>
    ) => {
      const newCommentList = [...state.commentList];

      newCommentList.concat(action.payload.commentList);
      //action.payload.commentList.map((data) => newCommentList.push(data));

      state.commentList = newCommentList;
      state.isLoading = false;
    },
    getCommentListRejected: (state) => {
      state.isLoading = false;
    },
  },
});

export const { actions } = CommentListSlice; //actions 라는 이름으로 슬라이스를 내보낸다 => 실제 components에서 사용

export default CommentListSlice.reducer; //rootSlice에 등록하기 위한 리듀서들만 내보낸다 => rootSlice 등록용으로만 사용

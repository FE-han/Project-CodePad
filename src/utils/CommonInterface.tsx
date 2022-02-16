export interface PresetData {
  presetId: string;
  thumbnailURL: string;
  title: string;
  author: string;
  userId: string;
}

export interface CommentData {
  userName: string;
  userId: string;
  userImageURL: string;
  commentId: string;
  comment: string;
}

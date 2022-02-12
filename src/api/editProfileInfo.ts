import axios from "axios";

export async function editProfileInfo(
  accessToken: string,
  name: string,
  thumbnail: string
) {
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/userProfile`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Contents-Type": "multipart/form-data",
        },
        body: JSON.stringify({ name, thumbnail }),
      }
    );
  } catch (e) {
    return { message: "프로필 수정 요청 실패" };
  }
}

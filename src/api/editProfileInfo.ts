import axios from "axios";

//${process.env.REACT_APP_SERVER_BASE_URL}
export default async function editProfileInfo(
  accessToken: string,
  name: string,
  thumbnail: string | undefined
) {
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/userProfile`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Contents-Type": "application/json",
        },
        body: JSON.stringify({ name, thumbnail }),
      }
    );

    return result;
  } catch (e) {
    return { message: "프로필 수정 요청 실패" };
  }
}

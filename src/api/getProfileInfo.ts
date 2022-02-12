import axios from "axios";

export default async function getProfileInfo(accessToken: string) {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/userProfile`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Contents-Type": "application/json",
        },
      }
    );
    const response = result.data;
    return response;
  } catch (e) {
    return { message: "프로필 불러오기 실패" };
  }
}

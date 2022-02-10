import axios from "axios";

interface getProfileInfoParams {
  accessToken: string;
}

export async function getProfileInfo(params: getProfileInfoParams) {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/userProfile`,
      {
        headers: {
          authorization: `Bearer ${params.accessToken}`,
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

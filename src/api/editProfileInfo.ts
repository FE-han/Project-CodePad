import axios from "axios";

interface editProfileInfoParams {
  accessToken: string;
  name: string;
  thumbnail: File;
}

export async function editProfileInfo(params: editProfileInfoParams) {
  try {
    let formData: FormData = new FormData();
    formData.append("name", params.name);
    formData.append("thumbnail", params.thumbnail);
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/userProfile`,
      {
        headers: {
          authorization: `Bearer ${params.accessToken}`,
          "Contents-Type": "multipart/form-data",
        },
        body: formData,
      }
    );
    const response = result.data;
    return response;
  } catch (e) {
    return { message: "프로필 수정 요청 실패" };
  }
}

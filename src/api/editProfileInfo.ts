import axios from "axios";

//${process.env.REACT_APP_SERVER_BASE_URL}
export default async function editProfileInfo(
  accessToken: string,
  userFormData: FormData
) {
  await axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/userProfile`, {
    headers: {
      "Contents-Type": "multipart/form-data",
    },
    body: userFormData,
  });
}

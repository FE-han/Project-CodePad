import axios from "axios";

interface GoogleLoginParams {}

export async function loginGoogle(params: GoogleLoginParams) {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/google`
    );
    const response = result.data;
    return response;
  } catch (e) {
    return { message: "로그인 요청 실패" };
  }
}

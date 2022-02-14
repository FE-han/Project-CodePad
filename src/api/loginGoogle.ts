import axios from "axios";

export default async function loginGoogle() {
  const response = await axios.get(`https://elice.codepad.gq/auth/google`);
  return response.data;
}

import { jwtDecode } from "jwt-decode";

export const DecodedData = (token: string) => {
  const data = jwtDecode(token);
  return data;
};

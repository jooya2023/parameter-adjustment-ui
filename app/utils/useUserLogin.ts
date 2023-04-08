import { useMutation } from "@tanstack/react-query";
import axios from "./axiosInstance";

type LoginData = {
  username: string;
  password: string;
};

const postUserData = async (data: LoginData) => {
  const res = await axios.post("/users/login/", data).then((res) => {
    const { username, tokens } = res.data.result;
    return {
      auth_token: tokens.access,
      refresh_token: tokens.refresh,
    };
  });

  return res;
};

export const useUserLogin = () => {
  return useMutation((data: LoginData) => postUserData(data), {});
};

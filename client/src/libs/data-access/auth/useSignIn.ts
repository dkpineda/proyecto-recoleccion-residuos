import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axios from "axios";

type SignInDto = {
  username: string;
  password: string;
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: SignInDto) => {
      try {
        console.log(data);
        const response = await axios.post("http://localhost:5000/auth/login", data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage =
            error.response.data.message || "An error occurred during sign in";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
  });
};

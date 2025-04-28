import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type SignInDto = {
  username: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
};

type ErrorResponse = {
  message: string;
};

export const useSignIn = (): UseMutationResult<SignInResponse, AxiosError, SignInDto> => {
  return useMutation<SignInResponse, AxiosError, SignInDto>({
    mutationFn: async (data: SignInDto) => {
      try {
        const response = await axios.post<SignInResponse>("http://localhost:5000/auth/login", data);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          return response.data;
        }
        throw new Error("Invalid credentials");
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.data &&
          typeof error.response.data === "object"
        ) {
          const errorData = error.response.data as ErrorResponse;
          const errorMessage =
            typeof errorData.message === "string" && errorData.message !== ""
              ? errorData.message
              : "An error occurred during sign in";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
  });
};

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type CreateUserDto = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type CreateUserResponse = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

type ErrorResponse = {
  message: string;
};

export const useCreateUser = (): UseMutationResult<CreateUserResponse, Error, CreateUserDto> => {
  return useMutation<CreateUserResponse, Error, CreateUserDto>({
    mutationFn: async (data: CreateUserDto) => {
      try {
        const response = await axios.post<CreateUserResponse>(
          "http://localhost:5000/auth/register",
          data,
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorData = error.response?.data as ErrorResponse | undefined;
          if (errorData?.message && typeof errorData.message === "string") {
            throw new Error(errorData.message);
          }
        }
        throw new Error("An error occurred during registration");
      }
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type CreateUserDto = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      try {
        console.log(data);
        const response = await axios.post("http://localhost:5000/auth/register", data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage =
            error.response.data.message || "An error occurred during registration";
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
  });
};

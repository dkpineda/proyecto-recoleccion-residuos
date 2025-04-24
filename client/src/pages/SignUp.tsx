import { CreateUserForm } from "@/features/users/CreateUserForm";

export const SignUp: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex w-1/2 bg-black justify-center items-center"></div>
      <div className="flex w-1/2 items-center justify-center bg-white p-8">
        <div>
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
};

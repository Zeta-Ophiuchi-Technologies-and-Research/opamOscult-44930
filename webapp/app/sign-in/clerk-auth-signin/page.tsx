import { Button } from "@base-ui/react";
import { SignIn, SignInButton } from "@clerk/nextjs";

export default function LoginClerk() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <SignIn />
    </div>
  );
}

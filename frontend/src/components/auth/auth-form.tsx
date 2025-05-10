import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import type { IAuthForm } from "@/types/auth.types";

interface AuthFormProps extends React.ComponentPropsWithoutRef<"div"> {
  type: "login" | "register";
  onToggleType: () => void;
}

export function AuthForm({
  className,
  type,
  onToggleType,
  ...props
}: AuthFormProps) {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: "onChange",
  });

  const { mutate } = useAuthMutation(reset, type);

  const onSubmit: SubmitHandler<IAuthForm> = (data: IAuthForm) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {type === "login" ? "Login" : "Register"}
              </CardTitle>
              <CardDescription>
                {type === "login"
                  ? "Enter your email below to login to your account"
                  : "Enter your email below to create your account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...register("email", {
                        required: "Email is required!",
                      })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                  </div>
                  <Button type="submit" className="w-full hover:cursor-pointer">
                    {type === "login" ? "Login" : "Register"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  {type === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <a
                        href="#"
                        className="underline underline-offset-4"
                        onClick={onToggleType}
                      >
                        Sign up
                      </a>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <a
                        href="#"
                        className="underline underline-offset-4"
                        onClick={onToggleType}
                      >
                        Login
                      </a>
                    </>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

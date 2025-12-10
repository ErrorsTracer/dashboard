"use client";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/services/auth/authApi";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuthCookie } from "@/services/actions";
import { AuthHook } from "@/hooks/authHook";

export default function SignIn() {
  AuthHook("unauthenticated");

  const [login, { isLoading, isError, error }] = useLoginMutation<any>();

  const onSubmit = async (data: any) => {
    try {
      const res = await login(data).unwrap();

      if (res.accessToken) {
        await setAuthCookie(res.accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginForm = useForm();

  const { push } = useRouter();

  return (
    <div className="w-full h-full grid place-items-center">
      <div className=" w-[90%] md:w-[450px] px-8 py-4 border-[1px] rounded-[15px]">
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="grid gap-4"
        >
          <div className="text-center ">
            <p className="text-xl font-semibold">Login</p>
            <div className="px-6 flex justify-center mt-2">
              <p className="max-w-[300px] text-gray-500 text-sm">
                Login & Start Monitoring Your Apps
              </p>
            </div>
          </div>
          {isError && (
            <div className="bg-red-400 px-2 py-1 rounded-md text-white flex gap-2">
              <span>{error?.data?.message}</span>
            </div>
          )}
          <Input
            type="email"
            placeholder="example@gmail.com"
            // leftIcon={<i className="mdi mdi-email"></i>}
            {...loginForm.register("email", { required: true })}
          />
          <Input
            type="password"
            placeholder="password"
            // leftIcon={<i className="mdi mdi-lock"></i>}
            {...loginForm.register("password", { required: true })}
          />

          <Button /* loading={isLoading} */ type="submit">Login</Button>

          <div className=" flex relative justify-center items-center before:before-[''] before:absolute before:left-0 before:w-full before:h-[1px] before:!z-0 before:bg-gray-300">
            <span className="bg-background text-gray-400 mb-1 px-1 inline-block z-50">
              or
            </span>
          </div>

          <button
            type="button"
            className="rounded-md border-[1px]"
            onClick={() =>
              push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v0.1/auth/google`)
            }
          >
            <div className=" py-2 flex items-center relative justify-center">
              <div className="absolute left-4 ">
                <Image
                  src="/google-icon.png"
                  alt="google"
                  width={20}
                  height={20}
                />
              </div>
              <span>Sign in with Google</span>
            </div>
          </button>

          {/* 
          <GoogleOAuthProvider
            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
          >
            <div className="grid  ">
              <GoogleLogin
                size="large"
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </GoogleOAuthProvider> */}

          <div className="text-center">
            <p className="text-sm">
              {"don't have account"}?{" "}
              <Link className="underline" href="/auth/register">
                create new account.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

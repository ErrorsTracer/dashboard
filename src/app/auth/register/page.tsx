"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHook } from "@/hooks/authHook";
import {
  useGetPlansMutation,
  useRegisterMutation,
} from "@/services/auth/authApi";
import { useAppDispatch, useTypedSelector } from "@/services/store";
import { toggleSystemLoading } from "@/services/system/systemSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  AuthHook("unauthenticated");
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation<any>();
  const [getPlans, { data }] = useGetPlansMutation<any>();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    getPlans(null);
  }, []);

  const registerForm = useForm();

  const { push } = useRouter();

  const { authenticated } = useTypedSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authenticated) {
      setTimeout(() => {
        dispatch(toggleSystemLoading(false));
      }, 500);
    }
  }, [authenticated]);

  const handleRegister = (data: any) => {
    register({ ...data, plan: plan?.id });
  };

  if (isSuccess)
    return (
      <div className="w-full h-full grid place-items-center">
        <div className="bg-white  overflow-hidden relative w-[90%] md:w-[450px] px-3 py-8  rounded-[10px]">
          <div className="  flex items-center justify-center mb-6">
            <div className=" bg-gradient-to-r   from-[#c1fcda]  to-[#cbf0be] inline-block w-[70px] h-[70px] flex items-center justify-center rounded-full">
              <i className="mdi mdi-email text-[40px] text-[#61c86e]"></i>
            </div>
          </div>
          <div className="text-center px-4 sm:px-8 ">
            <span className="">
              {"We've sent you an email to complete your registration."}
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className=" w-full h-full grid place-items-center ">
      <div className="border-[1px] flex md:flex-row flex-col items-center justify-center rounded-[15px]">
        <div className=" overflow-hidden  relative w-[90%] md:w-[450px] md:px-8 px-2 py-4">
          <form
            onSubmit={registerForm.handleSubmit(handleRegister)}
            className="flex flex-col justify-center gap-3 h-full"
          >
            {isSuccess && (
              <div className="bg-green-400 px-2 py-1 rounded-md text-white flex gap-2">
                <span>
                  <i className="mdi mdi-check "></i>
                </span>
                <span>Your account has been successfully created</span>
              </div>
            )}

            <div className="text-center">
              <p className="text-xl font-semibold">Create Your Account</p>
              <div className=" mt-2">
                <p className="text-gray-500 text-sm">
                  Start Monitoring Apps & Get E-mails For Production Errors
                </p>
              </div>
            </div>

            {isError && (
              <div className="bg-red-400 px-2 py-1 rounded-md text-white flex gap-2">
                <span>{error?.data?.message}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input
                type="text"
                placeholder="First Name"
                {...registerForm.register("firstName", {
                  required: true,
                })}
              />
              <Input
                type="text"
                placeholder="Last Name"
                {...registerForm.register("lastName", {
                  required: true,
                })}
              />
            </div>
            <Input
              type="email"
              placeholder="example@email.com"
              {...registerForm.register("email", { required: true })}
            />
            <Input
              type="password"
              placeholder="Password"
              {...registerForm.register("password", { required: true })}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              {...registerForm.register("confirmPassword", {
                required: true,
              })}
            />

            <div className="mt-2 w-full">
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>

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
                <span>Sign up with Google</span>
              </div>
            </button>
            <div className="text-center">
              <p className="text-sm">
                {"Already have account"}?{" "}
                <Link className="underline" href="/auth/login">
                  login instead.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

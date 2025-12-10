"use client";
import { useEffect } from "react";
import { useGetOrganizationCredentialsMutation } from "@/services/organizations/orgsApi";
import { useTypedSelector } from "@/services/store";
import { AuthHook } from "@/hooks/authHook";
import Skeleton from "react-loading-skeleton";

export default function Credentials() {
  AuthHook("authenticated");
  const [getOrganizationCredentials, { isLoading }] =
    useGetOrganizationCredentialsMutation();

  const { credentials } = useTypedSelector((state) => state.organizations);

  useEffect(() => {
    getOrganizationCredentials(null);
  }, []);

  return (
    <div className="grid  ">
      <div>
        <p className="text-[22px]">Organization Credentials</p>
      </div>

      <div>
        these are secret keys for your organization, make sure you keep these
        credentials in a save place
      </div>

      <div className="mt-4 border-[1px] rounded-md py-4 px-4 grid gap-2">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p>OrgKey</p>
            <code className="text-xs">
              issued in: {new Date(credentials?.updatedAt).toLocaleDateString()}
            </code>
          </div>
          <div className=" relative border-[1px] rounded-md py-2 px-4 relative">
            <p>
              {credentials?.appKey?.slice(0, 8)?.concat("***") || (
                <Skeleton width={"30%"} />
              )}
            </p>
            <button
              onClick={(e) => {
                navigator.clipboard?.writeText(credentials?.appKey);

                document
                  .getElementById("copied-to-clip-board")
                  ?.classList.toggle("hidden");

                setTimeout(() => {
                  document
                    .getElementById("copied-to-clip-board")
                    ?.classList.toggle("hidden");
                }, 3000);
              }}
              className="absolute duration-300 transition top-0 bg-[#25253233]  right-0 h-full px-4 grid place-items-center cursor-pointer"
            >
              <div
                id="copied-to-clip-board"
                className="absolute hidden  border-[1px] top-[-45px]  rounded-md bg-white shadow-mds"
              >
                <div className="relative">
                  <div className=" absolute border-r-[1px] border-b-[1px]    bottom-[-5.5px]  rotate-45  left-[30px]   bg-white  w-[10px] h-[10px]"></div>
                  <div className=" bg-white rounded-md  w-full h-full  px-2 py-1 z-[50]">
                    Copied
                  </div>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

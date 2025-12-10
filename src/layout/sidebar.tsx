"use client";
import Link from "next/link";

import { useAppDispatch, useTypedSelector } from "@/services/store";
import { toggleSystemLoading } from "@/services/system/systemSlice";
import { logout } from "@/services/auth/authSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const { organizations } = useTypedSelector((state) => state.organizations);

  const dispatch = useAppDispatch();

  return (
    <div className="flex xl:w-[300px] h-screen flex-col p-3">
      <div className="bg-sidebar h-full relative rounded-[20px]">
        <div className="text-[#616a79] flex-1  pt-4 gap-2 flex flex-col relative h-full">
          {/* logo */}
          <div className=" flex items-center gap-4 py-8 px-8">
            <p className="text-[25px] font-[800] text-white bg-indigo-500 w-[35px] h-[40px] flex items-center justify-center rounded-[10px] rotate-[-10deg]">
              E
            </p>
            <p className="text-[20px] font-[700] text-white">Dashboard</p>
          </div>
          <SidebarItem link="/" title={"Dashboard"} active={true}>
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </SidebarItem>
          <div className="mt-4 grid gap-5">
            <div className="px-6">
              <span className="tracking-[2px] text-[#a5aab3]">
                Organizations
              </span>
            </div>
            <div>
              <div className="grid gap-1">
                <SidebarItem link="/orgs" title={"Organizations"}>
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
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                </SidebarItem>
                <SidebarItem link="/apps" title={"Apps"}>
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
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                </SidebarItem>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-5">
            <div className="px-6">
              <span className="tracking-[2px] text-[#a5aab3]">General</span>
            </div>
            <div className="grid gap-1">
              {!organizations.find((item: any) => item.isActive)?.isOwner && (
                <SidebarItem link="/credentials" title={"Credentials"}>
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
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>
                </SidebarItem>
              )}

              {/* <SidebarItem link="/profile" title={"Profile"}>
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </SidebarItem> */}
              {/* <SidebarItem link="/settings" title={"Settings"}>
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
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </SidebarItem> */}
              {/* <SidebarItem link="/invitations" title={"Invitations"}>
            <i className="mdi mdi-account-multiple-outline"></i>
          </SidebarItem> */}
            </div>
          </div>
          <div className="mt-4 grid gap-5">
            <div className="px-6">
              <span className="tracking-[2px] text-[#a5aab3]">
                Documentations
              </span>
            </div>
            <div>
              <div className="grid gap-1">
                <SidebarItem
                  link="https://www.npmjs.com/package/@errors-tracer/react"
                  title={"React"}
                >
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
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </SidebarItem>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-5">
            <div className="px-6">
              <span className="tracking-[2px] text-[#a5aab3]">Actions</span>
            </div>
            <div className="grid gap-1">
              <div className={`relative  xl:px-4s`}>
                <Button
                  onClick={() => {
                    dispatch(logout(null));
                  }}
                  className={`bg-sidebar text-white w-full py-6 px-4 rounded-none flex  flex-row  justify-start items-center gap-4`}
                >
                  <div className="">
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
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                  </div>
                  <span className="">Logout</span>
                </Button>
              </div>
            </div>
          </div>

          <div className=" absolute bottom-0 w-full py-5 px-5">
            <Button variant="outline" className="w-full">
              Switch to premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = (props: any) => {
  const route = usePathname();

  return (
    <div className={`relative  ${route === props.link && ""}`}>
      <Link
        href={props.link}
        className={`  py-2 px-4 ${
          route.startsWith(props.link) &&
          props.link != "/" &&
          "bg-gradient-to-r from-[#6366f1] via-[#3c3e86] to-[#1f2133] text-white"
        } 
        ${
          props.link === route &&
          "bg-gradient-to-r from-[#6366f1] via-[#3c3e86] to-[#1f2133] text-white"
        }
         flex xl:flex-row items-centers xl:justify-start xl:items-center gap-4 relative`}
      >
        {/* <div className="bg-blue-400 w-[4px] h-full absolute left-0"></div> */}
        <div className="text-[18px]">{props?.children}</div>
        <div className=" block">
          <span className=" ">{props.title}</span>
        </div>
      </Link>
    </div>
  );
};

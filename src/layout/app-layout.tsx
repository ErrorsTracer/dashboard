"use client";
import { useEffect, useState } from "react";
import {
  useActivateAppMutation,
  useGetAppInfoMutation,
} from "@/services/applications/appsApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTypedSelector } from "@/services/store";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavbarItem = (props: any) => {
  return (
    <div
      className={`py-2 px-4 rounded-sm relative  ${
        props.active &&
        "bg-secondary after:content-[''] after:absolute after:bottom-[-1.5px] after:left-0 after:w-full after:h-[1.5px] after:bg-primary-dark"
      }`}
    >
      <Link href={props.link} className="flex  items-center gap-2  ">
        {props.icon}
        <span className="lg:inline-block hidden">{props.title}</span>
      </Link>
    </div>
  );
};

export const AppLayout = ({ children }: any) => {
  const pathname = usePathname();
  const { appInfo } = useTypedSelector((state) => state.applications);
  const [getAppInfo] = useGetAppInfoMutation();

  const [activateApp, { isLoading }] = useActivateAppMutation();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAppInfo(id);
    }
  }, [id]);

  return (
    <div>
      <div className=" flex gap-5">
        <div className="flex-1">
          <div className="flex border-b-[1px] pb-2  mb-8">
            <NavbarItem
              active={pathname.endsWith("/errors")}
              icon={<i className="mdi mdi-security text-lg" />}
              link={`/apps/${id}/errors`}
              title={"Errors"}
            />
            {appInfo?.member?.isOwner && (
              <NavbarItem
                active={pathname.endsWith("/settings")}
                icon={<i className="mdi mdi-cog-outline text-lg" />}
                link={`/apps/${id}/settings`}
                title={"Settings"}
              />
            )}
            <NavbarItem
              active={pathname.endsWith("/collaboration")}
              icon={<i className="mdi mdi-account-multiple text-lg" />}
              link={`/apps/${id}/collaboration`}
              title={"Collaboration"}
            />
            <NavbarItem
              active={pathname.endsWith("/webhooks")}
              icon={<i className="mdi mdi-webhook text-lg" />}
              link={`/apps/${id}/webhooks`}
              title={"WebHooks"}
            />
          </div>
          {appInfo?.application && !appInfo?.application?.isActive && (
            <div className="bg-secondary rounded-[15px] mb-4 px-4 py-4 ">
              <div className="lg:flex-row gap-3 flex-col flex items-center justify-between">
                <div>
                  <span className="lg:max-w-[60%] lg:text-md text-sm lg:text-start text-center inline-block">
                    To start using your application you need to activate it
                    first, once you activate it you will be able to use the
                    credentials in your project right away.
                  </span>
                </div>
                <Button
                  onClick={() => activateApp(id)}
                  className=" flex justify-center  min-w-[120px] text-white px-4 py-2 rounded-md text-sm bg-background"
                >
                  {isLoading ? (
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-white animate-spin  fill-blue-400"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <span>Activate Now</span>
                  )}
                </Button>
              </div>
            </div>
          )}
          <div className="grid">{children}</div>
        </div>
      </div>
    </div>
  );
};

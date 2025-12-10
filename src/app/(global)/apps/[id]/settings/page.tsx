"use client";
import { Button } from "@/components/ui/button";
// import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
// import { AuthHook } from "@/hooks/authHook";
import { Input } from "@/components/ui/input";
import { AuthHook } from "@/hooks/authHook";
import { AppLayout } from "@/layout/app-layout";
import {
  useDeactivateAppMutation,
  useDeleteAppMutation,
  useUpdateAppInfoMutation,
} from "@/services/applications/appsApi";
import { useTypedSelector } from "@/services/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

function Settings() {
  AuthHook("authenticated");
  const [confirmDeactivateModal, toggleConfirmDeactivateModal] =
    useState(false);
  const [confirmDeleteModal, toggleConfirmDeleteModal] = useState(false);
  const { replace } = useRouter();
  const { id } = useParams();

  const [deactivateApp, { isLoading, isSuccess: deactivateAppSuccess }] =
    useDeactivateAppMutation();
  const [deleteApp, { isLoading: isDeleteLoading, isSuccess }] =
    useDeleteAppMutation();

  const [
    updateAppInfo,
    { isLoading: isUpdateAppLoading, isSuccess: isUpdateAppSuccess },
  ] = useUpdateAppInfoMutation();

  const { handleSubmit, register, setValue } = useForm();

  const { appInfo } = useTypedSelector((state) => state.applications);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        replace("/applications");
      }, 1000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (appInfo) {
      setValue("name", appInfo.application?.name);
      setValue("about", appInfo.application?.about);
      setValue("allowNotifications", appInfo.application?.allowNotifications);
    }
  }, [appInfo]);

  return (
    <AppLayout>
      {/* <ConfirmationModal
        title={"Deactivate Application"}
        message="Are you sure you want to deactivate this Application? all memberships will be disabled unless you reenable it in collaboration tap."
        toggleModal={() => toggleConfirmDeactivateModal((prev) => !prev)}
        status={confirmDeactivateModal}
        onConfirm={() => deactivateApp(query.id)}
        loading={isLoading}
        success={deactivateAppSuccess}
      />

      <ConfirmationModal
        title={"Delete Application"}
        message="Are you sure you want to delete this Application? all memberships  will be deleted and this action cannot be undo."
        toggleModal={() => toggleConfirmDeleteModal((prev) => !prev)}
        status={confirmDeleteModal}
        onConfirm={() => deleteApp(query.id)}
        loading={isDeleteLoading}
        success={isSuccess}
      /> */}

      <div className="flex-1 grid gap-6">
        <div className="border-[#25253255]s bg-whites mt-4 border-[1px] rounded-md py-2 px-4 grid gap-2">
          <div>
            <p className="text-[22px]">Finish Your Application</p>
          </div>

          <div>
            these are secret keys for your organization, make sure you keep
            these credentials in a save place
          </div>

          <div className="grid gap-2">
            <p className="text-[18px] capitalize">configure the app</p>
          </div>

          <form
            onSubmit={handleSubmit((data) => updateAppInfo({ id, body: data }))}
            className="grid gap-4"
          >
            <div className="">
              <Input
                type="text"
                placeholder={appInfo?.application?.name}
                // leftIcon={"Name"}
                {...register("name", { required: false })}
              />
            </div>
            <Input
              type="text"
              placeholder={appInfo?.application?.about}
              // leftIcon={"About"}
              {...register("about", { required: false })}
            />

            <div className="flex gap-2  mb-2">
              <input
                id="default-checkbox"
                type="checkbox"
                className="w-5 h-5 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                {...register("allowNotifications", { required: false })}
              />
              <div className="grid  ">
                <label
                  htmlFor="default-checkbox"
                  className=" text-md font-medium "
                >
                  Enable Notifications
                </label>
                <span className="text-xs ">
                  You will receive daily emails with reports once you enable
                  notifications.
                </span>
              </div>
            </div>
            <div className="pb-3 flex gap-4  items-center  ">
              <button
                type="submit"
                className="inline-flex min-w-[150px] justify-center rounded-md bg-primary-dark  px-4 py-2 text-sm font-semibold text-white shadow-sm     "
              >
                {isUpdateAppLoading ? (
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
                  <span>Save</span>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 ">
          <div className="grid gap-2">
            <h2 className="capitalize font-semibold">credentials</h2>
            <span className="text-sm max-w-[80%]">
              In order to use your application, you need to copy this appkey. If
              you think your appKey is used by other projects which are not
              belong to you, regenerate a new appKey.
            </span>
          </div>
          <div>
            <div>
              {appInfo.credentials?.map((item: any) => (
                <div
                  key={item.id}
                  className=" mt-4 border-[1px] rounded-md py-4   px-4 grid gap-2"
                >
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <p>AppKey</p>
                        <span className="text-xs inline-block  border-[1px] rounded-md px-2 py-[2px]">
                          {item.env}
                        </span>
                      </div>
                      <code className="text-xs">
                        issued in:{" "}
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </code>
                    </div>
                    <div className=" border-[1px] rounded-md py-2 px-4 relative">
                      <p>{item?.appKey?.slice(0, 8)?.concat("***")}</p>

                      <button
                        onClick={(e) => {
                          navigator.clipboard?.writeText(item?.appKey);

                          document
                            .getElementById(item?.appKey)
                            ?.classList.remove("hidden");

                          setTimeout(() => {
                            document
                              .getElementById(item?.appKey)
                              ?.classList.add("hidden");
                          }, 3000);
                        }}
                        className="absolute duration-300 transition top-0 bg-secondary  right-0 h-full px-4 grid place-items-center"
                      >
                        <div
                          id={item?.appKey}
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
              ))}
            </div>
          </div>
        </div>

        <div className=" grid gap-2">
          <p className="text-[22px]  ">Danger Zone</p>
          <div className="border-red-400 border-[1px] rounded-md py-2 px-4 grid gap-2">
            <div className="flex items-center gap-8 justify-between">
              <div>
                <p className="text-lg">Deactivate Application</p>
                <span className="text-sm max-w-[600px] inline-block">
                  Are you sure you want to deactivate this Application? all
                  memberships will be disabled unless you reenable it in
                  collaboration tap.
                </span>
              </div>
              <div>
                <Button
                  onClick={() => toggleConfirmDeactivateModal(true)}
                  className="bg-red-400 inline-block text-white px-4 py-[8px] rounded-md text-sm"
                >
                  <span>Deactivate</span>
                </Button>
              </div>
            </div>
            <hr className="border-[#25253255]" />
            <div className="flex items-center gap-8 justify-between">
              <div>
                <p className="text-lg">Delete Application</p>
                <span className="text-sm max-w-[600px] inline-block">
                  Are you sure you want to delete this Application? all
                  memberships will be deleted and this action cannot be undo.
                </span>
              </div>
              <div>
                <Button
                  onClick={() => toggleConfirmDeleteModal(true)}
                  className="bg-red-400 inline-block text-white px-4 py-[8px] rounded-md text-sm"
                >
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Settings;

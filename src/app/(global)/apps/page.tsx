"use client";

import { AuthHook } from "@/hooks/authHook";
// import { Input } from "@/components/Input";
// import { FormModal } from "@/components/modals/FormModal";
import {
  useCreateApplicationMutation,
  useGetAppsMutation,
  useGetAppsTypesMutation,
} from "@/services/applications/appsApi";
import { useTypedSelector } from "@/services/store";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

const Applications = () => {
  AuthHook("authenticated");
  const [createAppModal, toggleCreateAppModal] = useState(false);
  const [loading, toggleLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<any>(null);
  const { appTypes, applications, sharedApplications } = useTypedSelector(
    (state) => state.applications
  );

  const applicationForm = useForm();

  const [createApplication, { isLoading, isSuccess }] =
    useCreateApplicationMutation();

  const [getAppsTypes] = useGetAppsTypesMutation();
  const [getApps, { isLoading: getAppLoading }] = useGetAppsMutation();

  useEffect(() => {
    getAppsTypes(null);
    getApps(null);
  }, []);

  useEffect(() => {
    toggleLoading(getAppLoading);
  }, [getAppLoading]);

  return (
    <div className="grid gap-4">
      {/* <FormModal
        title={"Create Application"}
        toggleModal={() => toggleCreateAppModal((prev) => !prev)}
        status={createAppModal}
        loading={isLoading}
        success={isSuccess}
      >
        <form
          onSubmit={applicationForm.handleSubmit(createApplication)}
          className="grid gap-4 mt-4"
        >
          <Input
            type="text"
            placeholder="Application name"
            leftIcon={<i className="mdi mdi-account"></i>}
            handler={applicationForm.register("name", {
              required: true,
            })}
          />
          <Input
            type="text"
            placeholder="About the application"
            leftIcon={"Description"}
            handler={applicationForm.register("about", {
              required: false,
            })}
          />
          <div className="grid grid-cols-4 gap-2">
            {appTypes.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-100 ${
                  selectedType?.id === item.id && "border-primary-dark"
                }  rounded-md border-[1px] py-2`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(item);
                    applicationForm.setValue("type", item.id);
                  }}
                  className=" w-full flex h-full justify-between flex-col items-center gap-2"
                >
                  <div className=" flex w-[35px] h-[35px]">
                    <Image
                      src={`/types/${item.picture}`}
                      alt={item.picture}
                      width={35}
                      height={35}
                      className="object-contain"
                    />
                  </div>

                  <span>{item.type}</span>
                </button>
              </div>
            ))}
          </div>

          <div className="   py-3 flex gap-4  items-center justify-center">
            <button
              type="submit"
              className="inline-flex  flex-1 justify-center rounded-md bg-primary-dark  px-3 py-2 text-sm font-semibold text-white shadow-sm     "
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
                <span>Create</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => toggleCreateAppModal(false)}
              className="inline-flex flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0 w-[100px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </FormModal> */}

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[22px]">My Applications</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2   xl:grid-cols-3  gap-4 my-3">
          {loading && applications.length < 1 ? (
            <Fragment>
              <Skeleton
                height={140}
                className="!rounded-[15px] border-[1.5px]"
                baseColor="#e0dddd"
                highlightColor="#e6e5e5"
              />
            </Fragment>
          ) : (
            applications.map((item: any) => (
              <AppItem
                key={item.id}
                link={
                  item.application.isActive
                    ? `/apps/${item.application.id}/${item?.application.type?.type}`
                    : `/apps/${item.application.id}/settings`
                }
                isActive={item.application.isActive}
                icon={item.application.type.picture}
                type={item.application.type.type}
                name={item.application.name}
                errors={item.errors}
              />
            ))
          )}

          <Link
            href={"#"}
            onClick={() => toggleCreateAppModal(true)}
            className="bg-white h-[140px] border-[1.5px] border-dashed  border-gray-400 shadow-sm px-5 grid gap-4 rounded-[15px] py-5 "
          >
            <div className="w-full gap-5 flex items-center">
              <div>
                <div className="border-[1px] w-[50px] h-[50px] rounded-full flex items-center justify-center">
                  <i className="mdi mdi-plus text-[40px]"></i>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[20px]">Set Up New App</p>
                </div>

                <div className="  ">
                  <p className="text-[14px]">Create + Monitor Apps For Free</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <p className="text-[22px]">Applications Shared With Me</p>
        </div>
        {loading || sharedApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2   xl:grid-cols-3  gap-4 my-3">
            {loading && sharedApplications.length < 1 ? (
              <Fragment>
                <Skeleton
                  height={140}
                  className="!rounded-[15px] border-[1.5px]"
                  baseColor="#7a7979ff"
                  highlightColor="#333131ff"
                />
              </Fragment>
            ) : (
              sharedApplications.map((item: any) => (
                <AppItem
                  key={item.id}
                  org={item.application?.organization}
                  link={
                    item.application.isActive
                      ? `/apps/${item.application.id}/${item?.application.type?.type}`
                      : `/apps/${item.application.id}/documentation`
                  }
                  isActive={item.application.isActive}
                  icon={item.application.type.picture}
                  type={item.application.type.type}
                  name={item.application.name}
                  errors={item.errors}
                />
              ))
            )}
          </div>
        ) : (
          <div className=" my-3">
            <div className="border-[1px] rounded-[15px]  px-4 py-8 ">
              <div className="flex items-center justify-center text-center">
                <div>
                  <span className="md:max-w-[60%] inline-block">
                    You have not shared application in your account yet!.
                    collaborate with others to see your shared apps in here.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AppItem = ({ name, icon, link, isActive, type, org, errors }: any) => {
  return (
    <Link
      href={link}
      className="border-[1px] h-[140px] grid place-items-center duration-300  px-5  gap-4 rounded-[15px] py-5 "
    >
      <div className="w-full  ">
        <div className="flex items-center justify-between">
          <p className="text-[20px]">{name}</p>
          {isActive ? (
            <p className="text-[14px] bg-green-400 px-2 rounded-md text-white">
              Active
            </p>
          ) : (
            <p className="text-[14px] bg-primary-dark px-2 rounded-md text-white">
              Inactive
            </p>
          )}
        </div>
        <div className="flex my-1">
          <p className="text-[14px] bg-red-400 px-2 rounded-md text-white">
            {errors} Errors
          </p>
        </div>
        <div className="mt-4 flex gap-2 items-center ">
          <div className="flex">
            <Image
              src={`/types/${icon}`}
              alt=""
              width={20}
              height={20}
              className="w-[20px] h-[20px] object-contain"
            />
          </div>
          <p className="text-[14px]">
            {type} {org && `| ${org?.name}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Applications;

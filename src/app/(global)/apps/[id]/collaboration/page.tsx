"use client";
import { ReactTable } from "@/components/react-table";
import { Button } from "@/components/ui/button";
import { AuthHook } from "@/hooks/authHook";
import { AppLayout } from "@/layout/app-layout";
import {
  useDeactivateMembershipMutation,
  useDeleteMembershipMutation,
  useSendInvitationMutation,
} from "@/services/applications/appsApi";
import { useTypedSelector } from "@/services/store";
import { createColumnHelper } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Settings() {
  AuthHook("authenticated");
  const [invitePeopleModal, toggleInvitePeopleModal] = useState(false);
  const [deleteMembershipModal, toggleDeleteMembershipModal] = useState(false);
  const [deactivateMembershipModal, toggleDeactivateMembershipModal] =
    useState(false);
  const [membership, setMembership] = useState<any>(null);
  const invitationForm = useForm();
  const query = useParams();

  const { appInfo } = useTypedSelector((state) => state.applications);

  const [
    sendInvitation,
    { isLoading: inviteLoading, isSuccess: inviteSuccess },
  ] = useSendInvitationMutation();

  const [
    deactivateMembership,
    { isLoading: deactivateLoading, isSuccess: deactivateSuccess },
  ] = useDeactivateMembershipMutation();

  const [deleteMembership, { isLoading, isSuccess }] =
    useDeleteMembershipMutation();

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("member.firstName", {
      header: "",
      cell: (info) => (
        <div className="flex gap-2  ">
          <div className="grid">
            <span className="font-semibold">
              {info.getValue()} {info.row.original.member.lastName}
            </span>
            <span className="text-xs">{info.row.original.member.email}</span>
          </div>
          <div>
            {info.row.original.isOwner && (
              <span className="text-xs border-blue-400 border-[1px] rounded-md px-2">
                Owner
              </span>
            )}
            {!info.row.original.isOwner && info.row.original.isYou && (
              <span className="text-xs border-blue-400 border-[1px] rounded-md px-2">
                You
              </span>
            )}
          </div>
        </div>
      ),
    }),

    columnHelper.accessor("id", {
      header: "",
      cell: (info) => (
        <div className=" flex justify-end gap-2">
          {!info.row.original.isOwner && info.row.original.isYou && (
            <button className="bg-red-400 inline-block text-white px-3 py-[5px] rounded-md text-xs">
              Leave
            </button>
          )}
          {!info.row.original.isOwner && !info.row.original.isYou && (
            <button
              onClick={() => {
                if (info.row.original?.activeMembership) {
                  setMembership(info.row.original);
                  toggleDeactivateMembershipModal(true);
                } else {
                  toggleDeactivateMembershipModal(false);
                  deactivateMembership(info.row.original?.id);
                }
              }}
              className="bg-primary-dark min-w-[90px] inline-block text-white px-3 py-[5px] rounded-md text-xs"
            >
              {info.row.original?.activeMembership && "Deactivate"}

              {!info.row.original?.activeMembership && (
                <span className="  h-full w-full inline-flex p-0 items-center justify-center">
                  {deactivateLoading ? (
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 text-gray-200 animate-spin p-0 m-0  fill-blue-400"
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
                    "Activate"
                  )}
                </span>
              )}
            </button>
          )}

          {!info.row.original.isOwner && !info.row.original.isYou && (
            <button
              onClick={() => {
                setMembership(info.row.original);
                toggleDeleteMembershipModal(true);
              }}
              className="bg-red-400 inline-block text-white px-3 py-[5px] rounded-md text-xs"
            >
              Remove
            </button>
          )}
        </div>
      ),
    }),
  ];

  const defaultData: any[] = appInfo.members ?? [];

  return (
    <AppLayout>
      {/* <ConfirmationModal
        title={"Remove Membership"}
        message={`Are you sure you want to remove ${membership?.member?.firstName}'s membership from this Application? You ca reinvite users anytime.`}
        toggleModal={() => toggleDeleteMembershipModal(false)}
        status={deleteMembershipModal}
        onConfirm={() => deleteMembership(membership.id)}
        loading={isLoading}
        success={isSuccess}
      />

      <ConfirmationModal
        title={"Deactivate Membership"}
        message={`Are you sure you want to remove access for ${membership?.member?.firstName} from this Application?`}
        toggleModal={() => toggleDeactivateMembershipModal(false)}
        status={deactivateMembershipModal}
        onConfirm={() => deactivateMembership(membership.id)}
        loading={deactivateLoading}
        success={deactivateSuccess}
      /> */}

      {/* <FormModal
        title={"Invite People"}
        toggleModal={() => toggleInvitePeopleModal((prev) => !prev)}
        status={invitePeopleModal}
        success={inviteSuccess}
        loading={inviteLoading}
      >
        <form
          onSubmit={invitationForm.handleSubmit((data) =>
            sendInvitation({ body: data, id: query.id })
          )}
          className="grid gap-4 mt-4"
        >
          <Input
            type="email"
            placeholder="User Email"
            leftIcon={<i className="mdi mdi-email"></i>}
            handler={invitationForm.register("email", { required: true })}
          />
          <div className="   py-3 flex gap-4  items-center justify-center">
            <button
              type="submit"
              className="inline-flex  flex-1 justify-center rounded-md bg-primary-dark  px-3 py-2 text-sm font-semibold text-white shadow-sm     "
            >
              <span>Send Invitation</span>
            </button>
            <button
              type="button"
              onClick={() => toggleInvitePeopleModal(false)}
              className="inline-flex flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0 w-[100px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </FormModal> */}

      <div className="flex-1">
        <div className="grid gap-2">
          <h2 className="capitalize font-semibold">collaboration</h2>
          <span className="text-sm  lg:max-w-[80%]">
            Invite People to your application separately without letting them
            access your entire {"org's"} applications, give them access to see
            reports, access credentials or setup webhooks.
          </span>
          <hr className="border-gray-300" />
        </div>
        {appInfo?.member?.isOwner && (
          <div className="mt-4">
            <div className="bg-secondary rounded-md  px-4 py-4 ">
              <div className="lg:flex-row gap-3 flex-col flex items-center justify-between">
                <div>
                  <span className="lg:max-w-[60%] lg:text-md text-sm lg:text-start text-center inline-block">
                    You do not have invited people yet. you can invite the
                    people who are inside or outside your organization.
                  </span>
                </div>
                <Button
                  onClick={() => toggleInvitePeopleModal(true)}
                  className="bg-background min-w-[120px] text-white px-4 py-2 rounded-md text-sm"
                >
                  Invite People
                </Button>
              </div>
            </div>
          </div>
        )}
        <div>
          <ReactTable
            paginationInfo={null}
            columns={columns}
            defaultData={defaultData}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default Settings;

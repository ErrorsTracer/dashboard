"use client";

import { useState, useEffect } from "react";
import {
  useCreateOrganizationMutation,
  useDeleteOrgMutation,
  useGetMyOrganizationsQuery,
  useInviteMemberMutation,
  useLeaveOrganizationMutation,
  useSwitchOrganizationMutation,
} from "@/services/organizations/orgsApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ReactTable } from "@/components/react-table";
import { Organization } from "@/ts/redux";
import { OrgsTableFactory } from "@/components/table-columns/organizations-table-factory";
import { AuthHook } from "@/hooks/authHook";

function Home() {
  AuthHook("authenticated");
  const [confirmModal, toggleConfirmModal] = useState(false);
  const [createOrgModal, toggleCreateOrgModal] = useState(false);
  const [invitePeopleModal, toggleInvitePeopleModal] = useState(false);
  const [leaveOrgModal, toggleLeaveOrgModal] = useState(false);
  const [membershipId, setMembershipId] = useState("");
  const organizationForm = useForm();
  const invitationForm = useForm();

  const { data } = useGetMyOrganizationsQuery(null);

  const [inviteMember, { isLoading: inviteLoading, isSuccess: inviteSuccess }] =
    useInviteMemberMutation();
  const [switchOrganization, { isLoading, isSuccess }] =
    useSwitchOrganizationMutation();

  const [deleteOrg] = useDeleteOrgMutation();

  const [
    leaveOrganization,
    { isLoading: leaveOrgLoading, isSuccess: leaveOrgSuccess },
  ] = useLeaveOrganizationMutation();

  const [
    createOrganization,
    { isLoading: createOrgLoading, isSuccess: createOrgSuccess },
  ] = useCreateOrganizationMutation();

  const { refresh } = useRouter();

  const onSwitchOrg = (id: string) => {
    setMembershipId(id);
    toggleConfirmModal(true);
  };

  const onInvitePeople = (id: string) => {
    setMembershipId(id);
    toggleInvitePeopleModal(true);
  };

  const onLeaveOrg = (id: string) => {
    setMembershipId(id);
    toggleLeaveOrgModal(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        refresh();
      }, 2500);
    }
  }, [isSuccess]);

  const onDeleteOrg = (id: string) => {
    // console.log(id);
    deleteOrg(id);
  };

  const defaultData = data ? (data as unknown as Organization[]) : [];

  const columns = OrgsTableFactory({
    onInvitePeople,
    onSwitchOrg,
    onLeaveOrg,
    onDeleteOrg,
  });

  const sendInvitation = (data: any) => {
    inviteMember({ id: membershipId, body: data });
  };

  return (
    <div>
      {/* <ConfirmationModal
        title={"Switch Organization"}
        message="Are you sure you want to switch to another organization? you can switch back anytime if you want."
        toggleModal={() => toggleConfirmModal((prev) => !prev)}
        status={confirmModal}
        onConfirm={() => switchOrganization(membershipId)}
        loading={isLoading}
        success={isSuccess}
      /> */}

      {/* <ConfirmationModal
        title={"Leave Organization"}
        message="Are you sure you want to leave this organization? your membership will be removed and you will no longer have access to organization's apps."
        toggleModal={() => toggleLeaveOrgModal((prev) => !prev)}
        status={leaveOrgModal}
        onConfirm={() => leaveOrganization(membershipId)}
        loading={leaveOrgLoading}
        success={leaveOrgSuccess}
      /> */}
      {/* <FormModal
        title={"Invite People"}
        toggleModal={() => toggleInvitePeopleModal((prev) => !prev)}
        status={invitePeopleModal}
        loading={inviteLoading}
        success={inviteSuccess}
      >
        <form
          onSubmit={invitationForm.handleSubmit(sendInvitation)}
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
      {/* <FormModal
        title={"Create Organization"}
        toggleModal={() => toggleCreateOrgModal((prev) => !prev)}
        status={createOrgModal}
        loading={createOrgLoading}
        success={createOrgSuccess}
      >
        <form
          onSubmit={organizationForm.handleSubmit(createOrganization)}
          className="grid gap-4 mt-4"
        >
          <Input
            type="text"
            placeholder="organization name"
            leftIcon={<i className="mdi mdi-account"></i>}
            handler={organizationForm.register("name", {
              required: true,
            })}
          />

          <Input
            type="email"
            placeholder="organization email"
            leftIcon={<i className="mdi mdi-email"></i>}
            handler={organizationForm.register("email", { required: true })}
          />
          <div className="   py-3 flex gap-4  items-center justify-center">
            <button
              type="submit"
              className="inline-flex  flex-1 justify-center rounded-md bg-primary-dark  px-3 py-2 text-sm font-semibold text-white shadow-sm     "
            >
              <span>Create</span>
            </button>
            <button
              type="button"
              onClick={() => toggleCreateOrgModal(false)}
              className="inline-flex flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0 w-[100px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </FormModal> */}
      <div className="flex items-center justify-between">
        <p className="text-[22px]">Organizations</p>
        <Button
          onClick={() => toggleCreateOrgModal(true)}
          className="bg-button-primary inline-block text-white px-3 py-[10px] rounded-md text-xs"
        >
          Create Organization
        </Button>
      </div>
      <div>
        <ReactTable
          paginationInfo={null}
          columns={columns}
          defaultData={defaultData}
        />
      </div>
    </div>
  );
}

export default Home;

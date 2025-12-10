import { OrganizationMembership } from "@/ts/redux";
import { createColumnHelper } from "@tanstack/table-core";
import Image from "next/image";
import Link from "next/link";
// import i18next from "i18next";

export const OrgsTableFactory = (props: any) => {
  const columnHelper = createColumnHelper<OrganizationMembership>();

  return [
    columnHelper.accessor("organization.name", {
      header: "",
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <Link href={"/"} className=" text-[#252532]">
            {info.getValue()}
          </Link>
          {!info.row.original.isActive && (
            <button
              onClick={() => props.onSwitchOrg(info.row.original.id)}
              className=" text-blue-400 px-3 py-[4px] text-xs"
            >
              <i className="mdi mdi-swap-horizontal text-[18px]" />
              Switch
            </button>
          )}
          {info.row.original.isActive && (
            <span className="text-xs border-blue-400 border-[1px] rounded-md px-2">
              active
            </span>
          )}
        </div>
      ),
    }),

    columnHelper.accessor("id", {
      header: "",
      cell: (info) => (
        <div className="flex justify-end gap-2">
          <button className="border-[1px] sm:inline-block hidden border-[#252532] inline-block text-black px-3 py-[5px] rounded-md text-xs">
            {info.row.original.isOwner ? "Owner" : "Member"}
          </button>
          {info.row.original.isActive && (
            <Link href={"/applications"} className="sm:block hidden">
              <button className="bg-primary-dark inline-block text-white px-3 py-[5px] rounded-md text-xs">
                Applications
              </button>
            </Link>
          )}
          {/* {!info.row.original.isActive && (
            <button
              onClick={() => props.onSwitchOrg(info.getValue())}
              className="bg-primary-dark sm:block hidden inline-block text-white px-3 py-[5px] rounded-md text-xs"
            >
              Switch
            </button>
          )} */}
          {/* {!info.row.original.isActive && info.row.original.isOwner && (
            <button
              onClick={() => props.onDeleteOrg(info.getValue())}
              className='bg-red-400 sm:block hidden inline-block text-white px-3 py-[5px] rounded-md text-xs'
            >
              Delete
            </button>
          )} */}
          {info.row.original.isOwner && (
            <button
              onClick={() => props.onInvitePeople(info.row.original.id)}
              className="bg-primary-dark inline-block text-white px-3 py-[5px] rounded-md text-xs"
            >
              Invite People
            </button>
          )}
          {!info.row.original.isOwner && !info.row.original.isActive && (
            <button
              onClick={() => props.onLeaveOrg(info.row.original.id)}
              className="bg-red-400 inline-block text-white px-3 py-[5px] rounded-md text-xs"
            >
              <span>Leave</span>
            </button>
          )}
        </div>
      ),
    }),
  ];
};

import { createColumnHelper } from "@tanstack/table-core";
import Link from "next/link";

export const ErrorsReportTableFactory = (props: any) => {
  const columnHelper = createColumnHelper<any>();

  return [
    columnHelper.accessor("application.name", {
      header: "",
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <span className="">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("application.id", {
      header: "",
      cell: (info) => (
        <div className=" flex justify-end gap-2 text-gray-500 text-sm">
          23 Total Errors
        </div>
      ),
    }),
    columnHelper.accessor("application.id", {
      header: "",
      cell: (info) => (
        <div className=" flex justify-end gap-2 text-gray-500 text-sm">
          21 Repeated
        </div>
      ),
    }),
    columnHelper.accessor("application.id", {
      header: "",
      cell: (info) => (
        <div className=" flex justify-end gap-2">
          <Link
            className="flex gap-2 items-center text-blue-400"
            href={`/applications/${info.getValue()}/React`}
          >
            <span>see errors</span> <i className="mdi mdi-arrow-right"></i>
          </Link>
        </div>
      ),
    }),
  ];
};

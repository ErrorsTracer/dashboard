import { ReactJsErrorsInterface } from "@/types/ReactJsErrors";
import { createColumnHelper } from "@tanstack/table-core";
import Image from "next/image";
// import i18next from "i18next";

export const ReactJsErrorsTableFactory = (props: any) => {
  const columnHelper = createColumnHelper<ReactJsErrorsInterface>();

  return [
    columnHelper.accessor("error", {
      header: "",
      cell: (info) => (
        <div className="text-red-500  ">
          <div title={info.getValue()} className="flex items-center gap-2">
            <div className="w-[16px] inline-block">
              <Image
                width={16}
                height={16}
                src={`/${info.row.original.clientAgent}.png`}
                alt=""
              />
            </div>
            {info.getValue()?.slice(0, 50)}
            {info.getValue().length > 50 && "..."}
          </div>
        </div>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: "",
      cell: (info) => (
        <div className="text-sm hidden md:block w-[170px]">
          {new Date(info.getValue()).toLocaleDateString()}
        </div>
      ),
    }),

    columnHelper.accessor("id", {
      header: "",
      cell: (info) => (
        <div className="flex items-center justify-end gap-4">
          <div className=" flex justify-end gap-2">
            <button className="bg-[#cad3fc] hidden md:block inline-block text-black px-3 py-[5px] rounded-md text-xs">
              Repeated: {info.row.original?.repeated}
            </button>
            <button
              onClick={() => props.openOneError(info.row.original)}
              className="bg-primary-dark inline-block text-white px-3 py-[5px] rounded-md text-xs"
            >
              More Details
            </button>
          </div>
        </div>
      ),
    }),
  ];
};

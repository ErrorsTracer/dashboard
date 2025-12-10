import * as React from "react";

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";

export const NoReportToRender = ({ children }: { children: any }) => (
  <div className="bg-[#1f2133db] mb-4 px-4 py-4 absolute w-full h-full ">
    <div className="lg:flex-row gap-3 grid place-items-center h-full">
      <div>
        <span className=" md:text-lg text-sm text-center inline-block">
          {children}
        </span>
      </div>
    </div>
  </div>
);

export function ReactTable(props: any) {
  const [data, setData] = React.useState(() => [...props.defaultData]);
  const [searchText, setSearchText] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  React.useEffect(() => {
    setData(props.defaultData);
  }, [props.defaultData]);

  const table = useReactTable({
    data,
    columns: props.columns,
    state: {
      sorting,
      globalFilter: searchText,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchText,
  });

  return (
    <div className="mb-4 relative !mt-6">
      {data?.length < 1 && !props?.isLoading && (
        <NoReportToRender>No data to display</NoReportToRender>
      )}
      <div
        className={`rounded-md border-[1px] ${
          data?.length < 1 && !props?.isLoading && "min-h-[160px]"
        }  px-4 py-2  overflow-hidden`}
      >
        <table className=" w-full ">
          <tbody>
            {data?.length < 1 && props?.isLoading ? (
              <>
                {[0, 1, 2, 3, 4].map(() => {
                  return table.getHeaderGroups().map((headerGroup, idx) => (
                    <tr className="border-t-[1px] text-center " key={idx}>
                      {headerGroup.headers.map((header, idx) => (
                        <td className="!py-4" key={idx}>
                          <Skeleton height={20} width={140} />
                        </td>
                      ))}
                    </tr>
                  ));
                })}
              </>
            ) : (
              <>
                {table.getRowModel().rows.map((row, idx) => (
                  <tr
                    className={`${++idx < data.length && "border-b-[1px]"}`}
                    key={idx}
                  >
                    {row.getVisibleCells().map((cell, idx) => (
                      <td className="!py-3 px-3 " key={idx}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

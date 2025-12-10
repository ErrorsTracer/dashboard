"use client";

import { useEffect, useState } from "react";
import "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useGetOrgReportsMutation } from "@/services/organizations/orgsApi";
import { useTypedSelector } from "@/services/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { ErrorsReportTableFactory } from "@/components/table-columns/errors-report-table-factory";
import { useGetAppsMutation } from "@/services/applications/appsApi";
import { ErrorsReportTableFactory } from "@/components/table-columns/errors-report-table-factory";
import { NoReportToRender, ReactTable } from "@/components/react-table";
import { AuthHook } from "@/hooks/authHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      text: "Chart.js Line Chart",
      display: false,
    },
  },
};

const labels = [
  "1 Jan",
  "2 Jan",
  "3 Jan",
  "3 Jan",
  "4 Jan",
  "5 Jan",
  "6 Jan",
  "7 Jan",
  "8 Jan",
  "9 Jan",
];

const data = {
  labels,
  datasets: [
    {
      lineTension: 0.5,
      label: "Errors",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // data: [0, 6, 8, 14, 8, 6, 10, 8, 4, 3],

      backgroundColor: "bg-primary-dark",
      borderColor: "#cad3fc",
      fill: {
        target: "origin",
        above: "#cad3fc88",
        below: "#cad3fc88",
      },
    },
  ],
};

const upperChart1 = {
  labels: [1, 2, 3, 4, 5, 6],
  datasets: [
    {
      lineTension: 0.5,
      label: "Errors",
      data: [4, 2, 5, 3, 9, 1],

      backgroundColor: "bg-gray-400",
      borderColor: "#2a314f03",
      fill: {
        target: "origin",
        above: "#2bdb6688",
        below: "#cad3fc88",
      },
    },
  ],
};
const upperChart2 = {
  labels: [1, 2, 3],
  datasets: [
    {
      lineTension: 0.5,
      label: "Errors",
      data: [0, 10, 4],

      backgroundColor: "bg-blue-400",
      borderColor: "#7a88c5",
      fill: {
        target: "origin",
        above: "#2b9e9c88",
        below: "#3751c188",
      },
    },
  ],
};

function Home() {
  AuthHook("authenticated");

  const [getOrgReports] = useGetOrgReportsMutation();
  const [getApps] = useGetAppsMutation();
  const { orgReports } = useTypedSelector((state) => state.organizations);

  const { refresh } = useRouter();
  const { sharedApplications, applications } = useTypedSelector(
    (state) => state.applications
  );

  const [windowWidth, setWindowWidth] = useState<number>();

  const defaultData: any = [...applications, ...sharedApplications].slice(0, 3);

  function Debounce(fn: any, delay: any) {
    let timerId: any;
    return function (...args: any) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  function handleResize() {
    const newWidth = window.innerWidth;

    if (newWidth !== windowWidth) {
      setWindowWidth(newWidth);
      refresh();
    }
    // Your code here, e.g., adjust UI or trigger actions based on the new window size
  }

  const debouncedHandleResize = Debounce(handleResize, 250); // Adjust the delay as needed

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", debouncedHandleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  useEffect(() => {
    getOrgReports(null);
    getApps(null);
  }, []);

  const columns = ErrorsReportTableFactory({});

  return (
    <div className="flex gap-5">
      <div className="flex-1">
        <div className="flex gap-4  transition  ease-in-out  duration-300">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <Link
              href={"/organizations"}
              className="bg-gradient-to-r from-[#23e3e2] to-[#5186d9] px-6 py-3 rounded-[15px] grid gap-8"
            >
              <div className="flex justify-between items-center">
                <span className="uppercase text-sm md:text-lg">Total Orgs</span>
                <span className="text-[34px] font-semibold">
                  {orgReports.totalOrgs ?? 0}
                </span>
              </div>
            </Link>
            <Link
              href={"/applications"}
              className=" bg-gradient-to-r from-[#d371f2] to-[#a574f9] px-6 py-3 rounded-[15px] grid gap-8"
            >
              <div className="flex justify-between items-center">
                <span className="uppercase text-sm md:text-lg">Total APPS</span>
                <p className="text-[34px] font-semibold">
                  {orgReports.totalApps ?? 0}
                </p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            <div className="  border-[2px]s bg-secondary px-4 py-2 rounded-[15px]">
              <div className="flex justify-between items-center">
                <span className="uppercase text-[16px]">Shared apps</span>
                <p className="text-[20px] font-semibold">
                  {orgReports.totalSharedApps ?? 0}
                </p>
              </div>
            </div>
            <div className="  border-[2px]s bg-secondary px-4 py-2 rounded-[15px]">
              <div className="flex justify-between items-center">
                <span className="uppercase text-[16px]">Total errors</span>
                <span className="text-[20px] font-semibold">
                  {orgReports.totalErrors ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-4">
          <div className="mt-4">
            <div className="flex  justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M45.7849 23.1836C45.7849 35.4714 35.5829 45.4405 22.9885 45.4405C10.3941 45.4405 0.192131 35.4714 0.192131 23.1836C0.192131 10.8958 10.3941 0.92675 22.9885 0.92675C35.5829 0.92675 45.7849 10.8958 45.7849 23.1836Z"
                      stroke="#ffffffff"
                      strokeWidth="0.384262"
                    />
                    <path
                      d="M26.618 18.8511V26.728M22.5849 21.805V26.728M18.5519 24.7588V26.728M16.5353 30.6664H28.6346C29.7483 30.6664 30.6511 29.7847 30.6511 28.6972V16.8819C30.6511 15.7944 29.7483 14.9127 28.6346 14.9127H16.5353C15.4216 14.9127 14.5188 15.7944 14.5188 16.8819V28.6972C14.5188 29.7847 15.4216 30.6664 16.5353 30.6664Z"
                      stroke="#ffffffff"
                      strokeWidth="0.576394"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p>Quick Information</p>
                  <span className="text-[14px] text-gray-400">
                    Quick Information about your apps
                  </span>
                </div>
              </div>
            </div>
            <div className="!mt-6 relative rounded-md border-[1px]">
              <div className="px-4 py-2 ">
                <div className="p-2 grid gap-5">
                  <div>
                    <p className="font-semibold">{"Happened This Week"}</p>
                    <span className="text-[25px] mt-3 inline-block">
                      0 Errors
                    </span>
                  </div>
                  <div className="">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">
                        Last 7 days stability increased by
                      </span>{" "}
                      <span className="text-[#10B982] inline-flex items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 7 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_272)">
                            <path
                              d="M3.97098 2.52441H5.89229M5.89229 2.52441V4.44573M5.89229 2.52441L3.97098 4.44573L3.01032 3.48507L1.56934 4.92605"
                              stroke="#ffffffff"
                              strokeWidth="0.576394"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_272">
                              <rect
                                width="5.76394"
                                height="5.76394"
                                fill="white"
                                transform="translate(0.848877 0.843262)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        0%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 col-span-2">
            <div className="flex  justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>
                  <svg
                    width="44"
                    height="45"
                    viewBox="0 0 44 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M43.4863 22.6531C43.4863 34.7216 33.7929 44.502 21.8391 44.502C9.88529 44.502 0.191826 34.7216 0.191826 22.6531C0.191826 10.5845 9.88529 0.80407 21.8391 0.80407C33.7929 0.80407 43.4863 10.5845 43.4863 22.6531Z"
                      stroke="#ffffffff"
                      strokeWidth="0.383652"
                    />
                    <path
                      d="M20.4978 13.6189C16.1875 14.0998 12.835 17.7878 12.835 22.2661C12.835 27.0712 16.6946 30.9664 21.4557 30.9664C25.893 30.9664 29.5472 27.5829 30.0237 23.2328H20.4978V13.6189Z"
                      stroke="#ffffffff"
                      strokeWidth="0.575478"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M29.5857 19.366H24.3292V14.061C26.7786 14.9348 28.72 16.894 29.5857 19.366Z"
                      stroke="#ffffffff"
                      strokeWidth="0.575478"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p>Errors Report</p>
                  <span className="text-[14px] text-gray-400">
                    See total errors in all apps
                  </span>
                </div>
              </div>
              <div className="">
                <Link
                  className="flex gap-2 items-center text-blue-400"
                  href={"/applications"}
                >
                  <span>Browse Apps</span>{" "}
                  <i className="mdi mdi-arrow-right"></i>
                </Link>
              </div>
            </div>

            <ReactTable
              paginationInfo={null}
              columns={columns}
              defaultData={defaultData}
            />
          </div>
        </div>
        <div className="mt-6">
          <div>
            <div className="flex  justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M45.7849 23.1836C45.7849 35.4714 35.5829 45.4405 22.9885 45.4405C10.3941 45.4405 0.192131 35.4714 0.192131 23.1836C0.192131 10.8958 10.3941 0.92675 22.9885 0.92675C35.5829 0.92675 45.7849 10.8958 45.7849 23.1836Z"
                      stroke="#ffffffff"
                      strokeWidth="0.384262"
                    />
                    <path
                      d="M26.618 18.8511V26.728M22.5849 21.805V26.728M18.5519 24.7588V26.728M16.5353 30.6664H28.6346C29.7483 30.6664 30.6511 29.7847 30.6511 28.6972V16.8819C30.6511 15.7944 29.7483 14.9127 28.6346 14.9127H16.5353C15.4216 14.9127 14.5188 15.7944 14.5188 16.8819V28.6972C14.5188 29.7847 15.4216 30.6664 16.5353 30.6664Z"
                      stroke="#ffffffff"
                      strokeWidth="0.576394"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p>Weekly Reports</p>
                  <span className="text-[14px] text-gray-400">
                    See your report for all of your active apps.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative max-h-[550px] border-[1px] mt-6 rounded-md  overflow-hidden">
            <div className="p-4">
              <div className=" md:flex  hidden  ">
                <Line
                  style={{ width: "100%" }}
                  options={{
                    ...options,
                    aspectRatio: 3.1,
                    maintainAspectRatio: true,
                  }}
                  data={data}
                />
              </div>
              <div className="md:hidden flex  ">
                <Line
                  style={{ width: "100%" }}
                  options={{ ...options, aspectRatio: 1.9 }}
                  data={data}
                />
              </div>
              <div className="flex mt-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-[#cad3fc88] border-[2px] border-[#cad3fc] w-[40px] h-[20px]"></div>
                  <span>Last 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#fecece66] border-[2px] border-[#fecece] w-[40px] h-[20px]"></div>
                  <span>Compared to a week before</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

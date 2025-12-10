"use client";
import { useGetReactAppErrorsMutation } from "@/services/reactjs/reactjsApi";
import { useEffect, useState } from "react";
import { useTypedSelector } from "@/services/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAppErrorsMutation,
  useGetAppInfoMutation,
} from "@/services/applications/appsApi";

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
import { AppLayout } from "@/layout/app-layout";
import { ReactJsErrorsInterface } from "@/ts/redux";
import { ReactJsErrorsTableFactory } from "@/components/table-columns/react-errors-table-factory";
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
  aspectRatio: 3.5,
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
      data: [1, 8, 12, 17, 9, 6, 11, 10, 9, 7, 12],

      backgroundColor: "bg-primary-dark",
      // borderColor: "#fecece66",
      // fill: {
      //   target: "origin",
      //   above: "#fecece66",
      //   below: "#fecece66",
      // },
      borderColor: "#cad3fc",
      fill: {
        target: "origin",
        above: "#cad3fc",
        below: "#cad3fc",
      },
    },
    // {
    //   lineTension: 0.5,
    //   label: "Errors",
    //   data: [0, 3, 9, 15, 13, 10, 8, 11, 7, 0],

    //   backgroundColor: "bg-primary-dark",
    //   borderColor: "#cad3fc",
    //   fill: {
    //     target: "origin",
    //     above: "#cad3fc",
    //     below: "#cad3fc",
    //   },
    // },
  ],
};

function Home() {
  AuthHook("authenticated");

  const [getReactAppErrors, { isLoading }] = useGetReactAppErrorsMutation();
  const { appInfo } = useTypedSelector((state) => state.applications);
  const [getAppInfo, { isLoading: getAppLoading }] = useGetAppInfoMutation();

  const [errorItem, setErrorItem] = useState<any>(null);
  const [showItemPanel, toggleItemPanel] = useState(false);

  const { refresh } = useRouter();

  const [getAppErrors] = useGetAppErrorsMutation();
  const { appErrors } = useTypedSelector((state) => state.applications);

  const defaultData: ReactJsErrorsInterface[] = isLoading ? [] : appErrors;

  const openOneError = (error: any) => {
    setErrorItem(error);
    toggleItemPanel(true);
  };

  const columns = ReactJsErrorsTableFactory({ openOneError });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAppInfo(id);
      getAppErrors(id);
    }
  }, [id]);

  useEffect(() => {
    getReactAppErrors(null);
  }, []);

  const [windowWidth, setWindowWidth] = useState(window?.innerWidth);

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

  // if (isLoading || getAppLoading) return <Loading />;

  return (
    <AppLayout>
      {/* <ErrorsSidePanel
        show={showItemPanel}
        onClose={() => toggleItemPanel(false)}
        {...errorItem}
      /> */}

      <div className="grid gap-4">
        <div className="relative">
          <p className="text-[22px] font-semibold">
            {appInfo?.application?.name}
          </p>
          <div className="bg-primary-dark w-[30px] h-[4px] rounded-md"></div>
        </div>

        <div className="relative max-h-[550px] bg-white   mt-4 rounded-md border-[1px] overflow-hidden">
          <NoReportToRender>
            Wait for the report to appear in the chart, it may take a few days
            to read your errors after you initially create application and use
            its credentials on your project to start tracking your production
            errors.
          </NoReportToRender>
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

            {/* <div className="flex mt-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#cad3fc88] border-[2px] border-[#cad3fc] w-[40px] h-[20px]"></div>
                <span>Last 7 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#fecece66] border-[2px] border-[#fecece] w-[40px] h-[20px]"></div>
                <span>Compared to a week before</span>
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <div className="relative ">
            <p className="text-[22px] font-semibold">Errors Table</p>
            <div className="bg-primary-dark w-[30px] h-[4px] rounded-md"></div>
          </div>

          <div className="mt-4 relative">
            <ReactTable
              isLoading={getAppLoading}
              paginationInfo={null}
              columns={columns}
              defaultData={defaultData}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export const NavbarItem = (props: any) => {
  return (
    <div
      className={`py-2   px-4 rounded-sm relative  ${
        props.active &&
        "bg-gray-200 after:content-[''] after:absolute after:bottom-[-1.5px] after:left-0 after:w-full after:h-[1.5px] after:bg-primary-dark"
      }`}
    >
      <Link href={props.link} className="flex  items-center gap-2  ">
        {props.icon}
        <span className="lg:inline-block hidden">{props.title}</span>
      </Link>
    </div>
  );
};

export default Home;

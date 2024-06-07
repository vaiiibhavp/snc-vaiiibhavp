import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Person } from "@/utils/common/person";
import { BooleanContext } from "@/contexts/BooleanContext";
import { useMutation } from "react-query";
import useCurrentDateTime from "../hooks/useCurrentDateFormat";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

const fetchUser = async (value: string) => {
  const response = await fetch(`/api/person?person=${value}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  const formattedTime = useCurrentDateTime();
  const { enableLogs, toggleValue } = useContext(BooleanContext);
  const [selectBtn, setSelectBtn] = useState<string | "">("");

  const { mutate, isLoading, error, data } = useMutation(fetchUser, {
    onSuccess: (data) => {
      if (enableLogs) console.log("API call successful:", data, formattedTime);
    },
    onError: (error) => {
      if (enableLogs) console.error("API call failed:", error, formattedTime);
    },
  });

  const handleChange = (data: string) => {
    setSelectBtn(data);
    mutate(data, enableLogs);
  };
  return (
    <main
      className={classNames(
        inter.className,
        "h-screen w-screen",
        "flex flex-col justify-center items-center"
      )}
    >
      <div className={classNames("gap-2")}>
        {isLoading ? (
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center mb-10"
          >
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4">
                {" "}
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5">
                {" "}
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5">
                {" "}
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5">
                {" "}
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5">
                {" "}
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]">
                {" "}
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : data ? (
          <div className=" p-4">
            <a
              href="#"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Image
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={data?.profilePictureUrl}
                height={500}
                width={500}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data?.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {data?.title}
                </p>
              </div>
            </a>
          </div>
        ) : error ? (
          <h2 className="text-red-500 p-4">Network response was not ok</h2>
        ) : null}
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            {Object.values(Person).map((person) => (
              <button
                className={`mr-4 p-3 border-2 border-slate-200 ${person === selectBtn ? "bg-slate-600" : ""}`}
                key={person}
                onClick={() => handleChange(person)}
                disabled={person === selectBtn}
              >
                {person}
              </button>
            ))}
          </div>
          <h2 className="flex justify-center p-4">{formattedTime}</h2>
          <button className="flex text-center p-2 border-2 border-slate-200" onClick={() => toggleValue(!enableLogs)}>{!enableLogs ?  'Enable log' : 'Disable log'}</button>
        </div>
      </div>
    </main>
  );
};

"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/admin/Sidebar";
import { ThemeProvider } from "@material-tailwind/react";
import { SnackbarProvider } from "notistack";

const DashboardLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <SnackbarProvider
        className="pl-1"
        iconVariant={{
          success: (
            <div className="text-green-500 p-2 rounded-lg bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
                ></path>
              </svg>
            </div>
          ),
          error: (
            <div className="text-red-500 p-2 rounded-lg bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
                ></path>
              </svg>
            </div>
          ),
        }}
      >
        <section>
          <div className="flex bg-[#F9FAFB]">
            <Sidebar />
            <div className="flex-1 px-14">
              <Header />
              {children}
            </div>
          </div>
        </section>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;

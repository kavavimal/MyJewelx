"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@material-tailwind/react";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <section>
        <div className="flex h-screen bg-[#F9FAFB]">
          <Sidebar />
          <div className="flex-1 px-14">
            <Header />
            {children}
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default DashboardLayout;

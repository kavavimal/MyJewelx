import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <section>
      <div className="flex h-screen bg-[#F9FAFB]">
        <Sidebar />
        <div className="flex-1 px-14">
          <Header />
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;

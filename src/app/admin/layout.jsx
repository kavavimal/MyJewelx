import Header from "@/components/Header";
import Sidebar from "@/components/admin/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <section>
      <div className="flex bg-[#F9FAFB]">
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

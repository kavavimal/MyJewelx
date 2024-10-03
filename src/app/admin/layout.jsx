import Header from "../components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <section>
        <div className="flex bg-[#eceff180]">
          <Sidebar />
          <div className="flex-1 px-5">
            <Header />
            {children}
          </div>
        </div>
      </section>
      {/* <div className="w-auto p-5 bg-[#eceff180]"><Footer /></div> */}
    </>
  );
};

export default DashboardLayout;

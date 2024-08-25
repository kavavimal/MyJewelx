import Header from '@/components/Header';
import Sidebar from '@/components/admin/Sidebar';

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
        </>
    );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <TopBar />
      <main className="ml-[72px] md:ml-[260px] pt-14 transition-all duration-300 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

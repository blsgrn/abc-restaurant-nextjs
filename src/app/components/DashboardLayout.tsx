"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StaffSidebar from "./StaffSidebar";
import CustomerSidebar from "./CustomerSidebar";
import AdminSidebar from "./AdminSidebar";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Get the current path
  const role = pathname.split("/")[1]; // Extract role from the URL

  const renderSidebar = () => {
    switch (role) {
      case "staff":
        return <StaffSidebar />;
      case "customer":
        return <CustomerSidebar />;
      case "admin":
        return <AdminSidebar />;
      default:
        return null; // Handle cases where the role is not recognized
    }
  };

  return (
    <div className="dashboard-layout flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="dashboard-sidebar w-64 bg-gray-200">
          {renderSidebar()}
        </div>
        <div className="dashboard-content flex-1 p-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;

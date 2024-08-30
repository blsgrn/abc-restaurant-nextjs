"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Home from "../components/Home";
import Profile from "../components/Profile";
import MenuManagement from "../components/MenuManagement";
import Settings from "../components/Settings";

const CustomerDashboard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [activeComponent, setActiveComponent] = useState("home");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");

    if (role !== "Customer") {
      router.push("/");
    } else {
      setName(storedName || "");
    }
  }, [router]);

  const renderContent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "profile":
        return <Profile />;
      case "menu-management":
        return <MenuManagement />;
      case "settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <DashboardLayout onMenuItemClick={setActiveComponent}>
      <>
        <p className="text-right">Welcome, {name}!</p>
        <h1 className="text-center">Customer Dashboard</h1>
        {renderContent()}
      </>
    </DashboardLayout>
  );
};

export default CustomerDashboard;

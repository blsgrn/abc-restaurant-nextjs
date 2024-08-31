"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import Home from "../components/Home";
import Profile from "../components/Profile";
import MenuManagement from "../components/MenuManagement";
import QueryManagement from "../components/QueryManagement";
import CreateAccountForm from "../components/CreateAccountForm";
import ManageAccounts from "../components/ManageAccounts";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  const renderContent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "profile":
        return <Profile />;
      case "menu-management":
        return <MenuManagement />;
      case "query-management":
        return <QueryManagement />;
      case "create-account":
        return <CreateAccountForm />;
      case "manage-accounts":
        return <ManageAccounts />;
      default:
        return <Home />;
    }
  };

  return (
    <DashboardLayout onMenuItemClick={setActiveComponent}>
      <>{renderContent()}</>
    </DashboardLayout>
  );
};

export default AdminDashboard;

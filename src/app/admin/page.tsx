"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import Profile from "../components/Profile";
import MenuManagement from "../components/MenuManagement";
import QueryManagement from "../components/QueryManagement";
import CreateAccountForm from "../components/CreateAccountForm";
import ManageAccounts from "../components/ManageAccounts";
import PaymentReport from "../components/PaymentReport";
import ReservationReport from "../components/Reports/ReservationReport";
import ReservationSummary from "../components/Reports/ReservationSummary";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  const renderContent = () => {
    switch (activeComponent) {
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
      case "payment-report":
        return <PaymentReport />;
      case "reservation-report":
        return <ReservationReport />;
      case "reservation-summary":
        return <ReservationSummary />;
      default:
        return <Profile />;
    }
  };

  return (
    <DashboardLayout onMenuItemClick={setActiveComponent}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;

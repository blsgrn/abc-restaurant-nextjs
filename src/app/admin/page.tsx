"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import Home from "../components/Home";
import Profile from "../components/Profile";
import MenuManagement from "../components/MenuManagement";
import QueryManagement from "../components/QueryManagement";
import CreateAccountForm from "../components/CreateAccountForm";
import ManageAccounts from "../components/ManageAccounts";
import PaymentReport from "../components/PaymentReport";
import ReservationReport from "../components/ReservationReport";

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
      case "payment-report":
        return <PaymentReport />;
      case "reservation-report-daily":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <h2 className="text-2xl font-semibold mb-4">Daily Reservations</h2>
            <ReservationReport type="daily" />
          </div>
        );
      case "reservation-report-weekly":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <h2 className="text-2xl font-semibold mb-4">Weekly Reservations</h2>
            <ReservationReport type="weekly" />
          </div>
        );
      case "reservation-report-monthly":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <h2 className="text-2xl font-semibold mb-4">
              Monthly Reservations
            </h2>
            <ReservationReport type="monthly" />
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <DashboardLayout onMenuItemClick={setActiveComponent}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;

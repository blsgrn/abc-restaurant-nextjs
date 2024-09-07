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
import WeeklyReservationTrendChart from "../components/Reports/WeeklyReservationTrendChart";
import QueryAnalysisReport from "../components/Reports/QueryAnalysisReport";
import UserActivity from "../components/Reports/UserActivityReport";
import PaymentLineChart from "../components/Reports/PaymentLineChart";
import PaymentPieChart from "../components/Reports/PaymentPieChart";

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
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div style={{ flex: 1, padding: "0 10px" }}>
              <PaymentLineChart />
            </div>
            <div style={{ flex: 1, padding: "0 10px" }}>
              <PaymentPieChart />
            </div>
          </div>
        );
      case "reservation-report":
        return <ReservationReport />;
      case "reservation-summary":
        return <ReservationSummary />;
      case "reservation-chart":
        return <WeeklyReservationTrendChart />;
      case "query-analysis":
        return <QueryAnalysisReport />;
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

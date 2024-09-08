"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import Profile from "../components/Profile";
import QueryForm from "../components/QueryForm";
import QueryResponse from "../components/QueryResponse";
import Settings from "../components/Settings";
import UserReservations from "../components/UserReservations";

const CustomerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile />;
      case "query-form":
        return <QueryForm />;
      case "query-response":
        return <QueryResponse />;
      case "view-reservation":
        return <UserReservations />;
      default:
        return <Profile />;
    }
  };

  return (
    <DashboardLayout onMenuItemClick={setActiveComponent}>
      <>{renderContent()}</>
    </DashboardLayout>
  );
};

export default CustomerDashboard;

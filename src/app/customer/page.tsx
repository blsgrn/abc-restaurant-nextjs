"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import Home from "../components/Home";
import Profile from "../components/Profile";
import QueryForm from "../components/QueryForm";
import QueryResponse from "../components/QueryResponse";
import Settings from "../components/Settings";

const CustomerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  const renderContent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "profile":
        return <Profile />;
      case "query-form":
        return <QueryForm />;
      case "query-response":
        return <QueryResponse />;
      case "settings":
        return <Settings />;
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

export default CustomerDashboard;

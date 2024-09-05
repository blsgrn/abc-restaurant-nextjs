"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import Home from "../components/Home";
import Profile from "../components/Profile";
import MenuManagement from "../components/MenuManagement";
import QueryManagement from "../components/QueryManagement";
import ViewReservations from "../components/ViewReservations";
import ManageGallery from "../components/ManageGallery";
import OfferForm from "../components/OfferForm";

const StaffDashboard = () => {
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
      case "view-reservations":
        return <ViewReservations />;
      case "manage-gallery":
        return <ManageGallery />;
      case "manage-offers":
        return <OfferForm />;
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

export default StaffDashboard;

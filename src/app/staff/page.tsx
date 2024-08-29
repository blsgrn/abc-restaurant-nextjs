"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const StaffDashboard = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");

    if (role !== "staff") {
      // Redirect if the role is not "staff"
      router.push("/");
    } else {
      setName(storedName || "");
    }
  }, [router]);

  return (
    <DashboardLayout>
      <h1>Staff Dashboard</h1>
      <p>Welcome, {name}!</p>
      {/* Staff-specific content */}
    </DashboardLayout>
  );
};

export default StaffDashboard;

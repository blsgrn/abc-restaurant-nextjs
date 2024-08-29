import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CustomerDashboard = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");

    if (role !== "customer") {
      // Redirect if the role is not "customer"
      router.push("/");
    } else {
      setName(storedName || "");
    }
  }, [router]);

  return (
    <DashboardLayout>
      <h1>Customer Dashboard</h1>
      <p className="text-orange-600">Welcome, {name}!</p>
      {/* Customer-specific content */}
    </DashboardLayout>
  );
};

export default CustomerDashboard;

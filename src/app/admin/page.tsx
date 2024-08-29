import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");

    if (role !== "admin") {
      // Redirect if the role is not "admin"
      router.push("/");
    } else {
      setName(storedName || "");
    }
  }, [router]);

  return (
    <DashboardLayout>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {name}!</p>
      {/* Admin-specific content */}
    </DashboardLayout>
  );
};

export default AdminDashboard;

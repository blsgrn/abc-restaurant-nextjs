import Link from "next/link";
import { FaHome, FaUserShield, FaChartBar } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-neutral-200 p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link href="/admin/home" className="flex items-center gap-x-2">
            <FaHome size={20} />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/users" className="flex items-center gap-x-2">
            <FaUserShield size={20} />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/reports" className="flex items-center gap-x-2">
            <FaChartBar size={20} />
            <span>Reports</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

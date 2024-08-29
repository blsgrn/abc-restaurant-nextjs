import Link from "next/link";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

const StaffSidebar = () => {
  return (
    <div className="bg-gray-800 text-neutral-200 p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Staff Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link href="/staff/home" className="flex items-center gap-x-2">
            <FaHome size={20} />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/staff/profile" className="flex items-center gap-x-2">
            <FaUser size={20} />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link href="/staff/settings" className="flex items-center gap-x-2">
            <FaCog size={20} />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StaffSidebar;

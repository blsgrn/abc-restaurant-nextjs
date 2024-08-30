import { FaHome, FaUser, FaCog } from "react-icons/fa";

const StaffSidebar = ({ onMenuItemClick }) => {
  return (
    <div className="bg-gray-800 text-neutral-200 p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Staff Dashboard</h2>
      <ul>
        <li className="mb-4" onClick={() => onMenuItemClick("home")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaHome size={20} />
            <span>Home</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("profile")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaUser size={20} />
            <span>Profile</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("menu-management")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaUser size={20} />
            <span>Menu Management</span>
          </div>
        </li>
        <li onClick={() => onMenuItemClick("settings")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaCog size={20} />
            <span>Settings</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StaffSidebar;

import { FaHome, FaUser, FaCog } from "react-icons/fa";

const AdminSidebar = ({ onMenuItemClick }) => {
  return (
    <div className="bg-info-content text-info p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
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
        <li
          className="mb-4"
          onClick={() => onMenuItemClick("query-management")}
        >
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaCog size={20} />
            <span>Query Management</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("create-account")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaCog size={20} />
            <span>Create Account</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("manage-accounts")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaCog size={20} />
            <span>Manage Accounts</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

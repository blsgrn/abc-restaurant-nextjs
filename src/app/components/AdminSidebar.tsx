import { FaUser } from "react-icons/fa";
import { BiSolidFoodMenu, BiSolidReport } from "react-icons/bi";
import { SiGooglebigquery } from "react-icons/si";
import { MdSwitchAccount } from "react-icons/md";

const AdminSidebar = ({ onMenuItemClick }) => {
  return (
    <div className="bg-info-content text-info p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
      <ul>
        <li className="mb-4" onClick={() => onMenuItemClick("profile")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaUser size={20} color={"#fff"} />
            <span>Profile</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("menu-management")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <BiSolidFoodMenu size={20} color={"#fff"} />
            <span>Menu Management</span>
          </div>
        </li>
        <li
          className="mb-4"
          onClick={() => onMenuItemClick("query-management")}
        >
          <div className="flex items-center gap-x-2 cursor-pointer">
            <SiGooglebigquery size={20} color={"#fff"} />
            <span>Query Management</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("create-account")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <MdSwitchAccount size={20} color={"#fff"} />
            <span>Create Account</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("manage-accounts")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <MdSwitchAccount size={20} color={"#fff"} />
            <span>Manage Accounts</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("payment-report")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <BiSolidReport size={20} color={"#fff"} />
            <span>Payment Report</span>
          </div>
        </li>
        <li
          className="mb-4"
          onClick={() => onMenuItemClick("reservation-report-daily")}
        >
          <div className="flex items-center gap-x-2 cursor-pointer">
            <BiSolidReport size={20} color={"#fff"} />
            <span>Reservation Report Daily</span>
          </div>
        </li>
        <li
          className="mb-4"
          onClick={() => onMenuItemClick("reservation-report-weekly")}
        >
          <div className="flex items-center gap-x-2 cursor-pointer">
            <BiSolidReport size={20} color={"#fff"} />
            <span>Reservation Report Weekly</span>
          </div>
        </li>
        <li
          className="mb-4"
          onClick={() => onMenuItemClick("reservation-report-monthly")}
        >
          <div className="flex items-center gap-x-2 cursor-pointer">
            <BiSolidReport size={20} color={"#fff"} />
            <span>Reservation Report Monthly</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

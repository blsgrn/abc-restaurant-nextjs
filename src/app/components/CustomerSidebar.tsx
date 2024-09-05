import { FaUser } from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { MdLocalDining } from "react-icons/md";

const CustomerSidebar = ({ onMenuItemClick }) => {
  return (
    <div className="bg-info-content text-info p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Customer Dashboard</h2>
      <ul>
        <li className="mb-4" onClick={() => onMenuItemClick("profile")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <FaUser size={20} color="#fff" />
            <span>Profile</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("query-form")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <SiGooglebigquery size={20} color="#fff" />
            <span>Query Form</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("query-response")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <SiGooglebigquery size={20} color="#fff" />
            <span>Query ResponseForm</span>
          </div>
        </li>
        <li onClick={() => onMenuItemClick("view-reservation")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <MdLocalDining size={20} color="#fff" />
            <span>View Reservation</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CustomerSidebar;

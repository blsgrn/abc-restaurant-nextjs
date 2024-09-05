import { FaUser } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { SiGooglebigquery } from "react-icons/si";
import { MdLocalDining, MdOutlineDiscount } from "react-icons/md";
import { GrGallery } from "react-icons/gr";

const StaffSidebar = ({ onMenuItemClick }) => {
  return (
    <div className="bg-info-content text-info p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Staff Dashboard</h2>
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
        <li
          className="mb-4"
          onClick={() => onMenuItemClick("manage-reservations")}
        >
          <div className="flex items-center gap-x-2 cursor-pointer">
            <MdLocalDining size={20} color={"#fff"} />
            <span>Manage Reservations</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("manage-gallery")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <GrGallery size={20} color={"#fff"} />
            <span>Manage Gallery</span>
          </div>
        </li>
        <li className="mb-4" onClick={() => onMenuItemClick("manage-offers")}>
          <div className="flex items-center gap-x-2 cursor-pointer">
            <MdOutlineDiscount size={20} color={"#fff"} />
            <span>Manage Offers</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StaffSidebar;

import Link from "next/link";
import { FaHome, FaCartPlus, FaUser } from "react-icons/fa";

const CustomerSidebar = () => {
  return (
    <div className="bg-gray-800 text-neutral-200 p-6 w-64 h-full">
      <h2 className="text-lg font-semibold mb-4">Customer Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link href="/customer/home" className="flex items-center gap-x-2">
            <FaHome size={20} />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/customer/orders" className="flex items-center gap-x-2">
            <FaCartPlus size={20} />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link href="/customer/profile" className="flex items-center gap-x-2">
            <FaUser size={20} />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerSidebar;

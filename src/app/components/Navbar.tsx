import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { FaRegUser } from "react-icons/fa";
import { CiTextAlignJustify } from "react-icons/ci";

const navLinks = [
  { name: "Home" },
  { name: "Menu" },
  { name: "Services" },
  { name: "About Us" },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center container py-6">
      <div className="flex items-center ">
        <Image
          src={Logo}
          width={100}
          height={100}
          color={"#8eede7"}
          alt="Logo"
          className="bg-violet-900 flex p-2"
        />
        <div className="navbar-center bg-accent p-6 mx-6 rounded-md flex gap-x-24">
          {navLinks.map((item, index) => (
            <p className="font-medium text-neutral-800" key={index}>
              {item.name}
            </p>
          ))}
        </div>
      </div>
      <div className="navbar-end rounded-md flex gap-x-8">
        <p className="font-medium text-neutral-600 my-auto">
          Create An Account
        </p>
        <div className="flex items-center gap-x-2">
          <FaRegUser color="#4d1d95" size={28} alt="User Profile" />
          <span className="font-medium text-neutral-600 lg:block">Sign in</span>
        </div>

        <CiTextAlignJustify
          size={40}
          color="#4d1d95"
          alt="User Profile"
          className="lg:hidden"
        />
      </div>
    </nav>
  );
};

export default Navbar;

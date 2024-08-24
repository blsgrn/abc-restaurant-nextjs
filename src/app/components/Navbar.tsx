import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo.svg";
import { FaRegUser } from "react-icons/fa";
import { CiTextAlignJustify } from "react-icons/ci";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about-us" },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center md:justify-around container p-6 md:pb-0">
      <div className="flex items-center justify-center">
        <Image
          src={Logo}
          width={100}
          height={100}
          color={"#8eede7"}
          alt="Logo"
          className="bg-violet-900 flex p-2 pb-0"
        />
        <div className="navbar-center bg-accent p-6 mx-6 rounded-md flex gap-x-24 2xl:gap-x-12 lg:gap-x-4 md:hidden">
          {navLinks.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="font-medium text-neutral-800"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="navbar-end rounded-md flex gap-x-8 md:gap-x-4">
        <Link href="/sign-in" className="flex items-center gap-x-2">
          <FaRegUser color="#4d1d95" size={28} alt="User Profile" />
          <span className="font-medium text-neutral-600 sm:hidden">
            Sign in
          </span>
        </Link>

        <CiTextAlignJustify
          size={40}
          color="#4d1d95"
          alt="User Profile"
          className="hidden md:block"
        />
      </div>
    </nav>
  );
};

export default Navbar;

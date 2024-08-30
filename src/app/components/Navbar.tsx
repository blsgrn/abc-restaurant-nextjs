"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../../../public/logo.svg";
import { FaRegUser } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about-us" },
];

const Navbar = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");
    if (storedName && storedRole) {
      setName(storedName);
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    router.push("/");
  };

  const getDashboardLink = () => {
    switch (role.toLowerCase()) {
      case "customer":
        return "/customer";
      case "staff":
        return "/staff";
      case "admin":
        return "/admin";
      default:
        return "/";
    }
  };

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
      <div className="navbar-end rounded-md flex items-center gap-x-8 md:gap-x-4">
        {name ? (
          <>
            <div className="flex items-center space-x-4 bg-neutral p-2 rounded-lg shadow-sm">
              <Link href={getDashboardLink()}>
                <span className="font-bold text-success">Welcome, {name}!</span>
              </Link>
              <button
                onClick={handleLogout}
                className="font-medium text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link href="/sign-in" className="flex items-center gap-x-2">
            <FaRegUser color="#4d1d95" size={28} alt="User Profile" />
            <span className="font-medium text-neutral-600">Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

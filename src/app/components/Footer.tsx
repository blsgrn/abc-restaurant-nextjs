import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about-us" },
];

const Footer = () => {
  return (
    <footer className="bg-violet-900 text-neutral-200 py-8 h-fit">
      <div className="container mx-auto flex flex-row md:flex-col justify-around items-center">
        {/* Logo and Description */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt="Logo"
            className="mb-4"
          />
          <p className="text-left md:text-center text-sm p-2">
            Bringing you the best culinary experience with a blend of tradition
            and innovation.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mt-0 md:mt-6 flex flex-row md:flex-col gap-y-4 gap-x-16 ">
          <div className="flex flex-col items-start md:items-center sm:hidden">
            <h5 className="font-semibold mb-2">Quick Links</h5>
            {navLinks.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="text-neutral-400 hover:text-neutral-100"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start md:items-center">
            <h5 className="font-semibold mb-2">Contact Us</h5>
            <p className="text-neutral-400">123 ABC Street, City, Sri Lanka</p>
            <p className="text-neutral-400">+94 123 456 789</p>
            <p className="text-neutral-400">info@abc-restaurant.com</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 p-2 flex justify-end md:justify-center gap-x-6">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <FaFacebookF size={24} color="#8eede7" />
          </Link>
          <Link
            href="https://www.twitter.com"
            target="_blank"
            aria-label="Twitter"
          >
            <FaTwitter size={24} color="#8eede7" />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <FaInstagram size={24} color="#8eede7" />
          </Link>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-orange-200">
        © {new Date().getFullYear()} ABC Restaurant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { logoImage } from "@/constants/Logo";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";

const services = [
  { id: 1, title: "General Trade" },
  { id: 2, title: "Traditional Wholesale" },
  { id: 3, title: "Modern Trade (National)" },
  { id: 4, title: "Modern Trade (Regional)" },
  { id: 5, title: "Cash & Carry" },
  { id: 6, title: "Distribution Services" },
];

const company = [
  { id: 1, title: "About Us" },
  { id: 2, title: "Careers" },
  { id: 3, title: "Documents" },
];

const Header = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1, type: "spring", stiffness: 100 }}
      className={cn(
        "fixed w-full max-w-5xl mx-auto border rounded-full top-4 left-0 right-0 z-50 transition-all duration-100",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md" 
          : "bg-white/90 shadow-sm",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src={logoImage}
              width={120}
              height={80}
              alt="Logo"
              className=" rounded-full object-cover"
            />
          
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="py-2">
                  {services.map((item) => (
                    <HoveredLink key={item.id} href={item.title}>
                      {item.title}
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Partner">
                {/* Empty dropdown for now */}
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Company">
                <div className="py-2">
                  {company.map((item) => (
                    <HoveredLink key={item.id} href={item.title}>
                      {item.title}
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
            </Menu>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 border border-orange-500 rounded-full text-sm font-medium text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white rounded-full bg-orange-500 hover:bg-orange-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t mt-2 rounded-b-2xl overflow-hidden shadow-lg"
          >
            <div className="px-4 py-3 space-y-3">
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Services
                </p>
                {services.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Company
                </p>
                {company.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              <div className="pt-2 space-y-2">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-orange-600 border border-orange-500 rounded-full hover:bg-orange-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-orange-600 rounded-full hover:bg-orange-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
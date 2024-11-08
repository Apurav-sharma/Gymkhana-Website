"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festsOpen, setFestsOpen] = useState(false); // State to track Fests dropdown
  const [committeeOpen, setCommitteeOpen] = useState(false); // State for Committees dropdown

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      setVisible(scrollYProgress.get() <= 0 || direction <= 0);
    }
  });

  const toggleMenuOpen = () => setMenuOpen(!menuOpen);
  const toggleMobileMenuOpen = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleFestsOpen = () => setFestsOpen(!festsOpen); // Toggle Fests dropdown
  const toggleCommitteeOpen = () => setCommitteeOpen(!committeeOpen); // Toggle Committees dropdown

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-transparent z-[5000] lg:px-[2vw] py-2 items-center justify-between sm:space-x-4 text-neutral-50 shadow-md shadow-gray-500",
          className
        )}
      >
        {/* Hamburger Menu for Small Devices */}
        <button
          className="md:hidden px-[10vw]"
          onClick={toggleMobileMenuOpen}
        >
          <svg
            className="w-6 h-6 text-neutral-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-800 text-neutral-50 p-4 rounded-md shadow-md z-50">
            <ul className="space-y-2">
              {navItems.map((navItem, idx) => {
                const isCommittee = navItem.name === "Committees";
                const isFests = navItem.name === "Fests"; // Detect Fests

                return (
                  <li key={`mobile-link-${idx}`}>
                    <Link
                      href={navItem.link}
                      className={cn(
                        "block text-neutral-50 hover:text-blue-500 py-2",
                        pathname === navItem.link && "font-bold"
                      )}
                      onClick={(e) => {
                        // Prevent closing the entire mobile menu when clicking on dropdown items
                        if (isCommittee || isFests) {
                          e.preventDefault(); // Prevent default behavior
                        }
                        if (isCommittee) toggleCommitteeOpen();
                        if (isFests) toggleFestsOpen(); // Handle Fests
                      }}
                    >
                      {navItem.name}
                    </Link>

                    {/* Dropdown for Committees in Mobile Menu */}
                    {isCommittee && committeeOpen && (
                      <div className="mt-2 bg-gray-700 rounded-md shadow-md">
                        <ul className="space-y-2 p-2">
                          <li>
                            <Link href="/committees/technical" className="block hover:text-blue-500">
                              Technical
                            </Link>
                          </li>
                          <li>
                            <Link href="/committees/cultural" className="block hover:text-blue-500">
                              Cultural
                            </Link>
                          </li>
                          <li>
                            <Link href="/committees/sports" className="block hover:text-blue-500">
                              Sports
                            </Link>
                          </li>
                          <li>
                            <Link href="/committees/academics" className="block hover:text-blue-500">
                              Academic
                            </Link>
                          </li>
                          <li>
                            <Link href="/committees/welfare" className="block hover:text-blue-500">
                              Welfare
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Dropdown for Fests in Mobile Menu */}
                    {isFests && festsOpen && (
                      <div className="mt-2 bg-gray-700 rounded-md shadow-md">
                        <ul className="space-y-2 p-2">
                          <li>
                            <Link href="/fests/horizon" className="block hover:text-blue-500">
                              Horizon
                            </Link>
                          </li>
                          <li>
                            <Link href="/fests/stavya" className="block hover:text-blue-500">
                              Stavya
                            </Link>
                          </li>
                          <li>
                            <Link href="/fests/olympus" className="block hover:text-blue-500">
                              Olympus
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Normal Menu */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((navItem, idx) => {
            const isActive = pathname === navItem.link;
            const isCommittee = navItem.name === "Committees";
            const isFests = navItem.name === "Fests"; // Detect Fests

            return (
              <div
                key={`link-${idx}`}
                className="relative"
                onMouseEnter={() => {
                  if (isCommittee) toggleCommitteeOpen();
                  if (isFests) toggleFestsOpen(); // Handle Fests
                }}
                onMouseLeave={() => {
                  if (isCommittee) toggleCommitteeOpen();
                  if (isFests) toggleFestsOpen(); // Handle Fests
                }}
              >
                <Link
                  href={navItem.link}
                  className={cn(
                    "relative text-neutral-50 items-center flex px-4 hover:text-neutral-300"
                  )}
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block text-md">{navItem.name}</span>
                  <span
                    className={cn(
                      "absolute inset-x-[10%] w-[80%] -bottom-px h-px",
                      isActive
                        ? "bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                        : "bg-transparent"
                    )}
                  />
                </Link>

                {/* Dropdown Menu for Committees */}
                {isCommittee && committeeOpen && (
                  <div className="absolute top-full left-0 bg-transparent text-neutral-50 rounded-md shadow-sm shadow-gray-400 p-4 z-10">
                    <ul className="space-y-2">
                      <li>
                        <Link href="/committees/technical" className="hover:text-blue-500">
                          Technical
                        </Link>
                      </li>
                      <li>
                        <Link href="/committees/cultural" className="hover:text-blue-500">
                          Cultural
                        </Link>
                      </li>
                      <li>
                        <Link href="/committees/sports" className="hover:text-blue-500">
                          Sports
                        </Link>
                      </li>
                      <li>
                        <Link href="/committees/academics" className="hover:text-blue-500">
                          Academic
                        </Link>
                      </li>
                      <li>
                        <Link href="/committees/welfare" className="hover:text-blue-500">
                          Welfare
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Dropdown Menu for Fests */}
                {isFests && festsOpen && (
                  <div className="absolute top-full left-0 bg-transparent text-neutral-50 rounded-md shadow-sm shadow-gray-400 p-4 z-10">
                    <ul className="space-y-2">
                      <li>
                        <Link href="/fests/horizon" className="hover:text-blue-500">
                          Horizon
                        </Link>
                      </li>
                      <li>
                        <Link href="/fests/stavya" className="hover:text-blue-500">
                          Stavya
                        </Link>
                      </li>
                      <li>
                        <Link href="/fests/olympus" className="hover:text-blue-500">
                          Olympus
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

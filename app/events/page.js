"use client";
import React from "react";
import { Timeline } from "./timeline";
import { FloatingNav } from "../components/ui/floating-navbar";
import Footer from "../foot/footer";
//import { FloatingNav } from "../components/ui/floating-navbar";

const data = [
  {
    title: "Project Kickoff",
    content: "The project started in 2022 with a great vision.",
    image: "../cover4.jpg",
  },
  {
    title: "First Milestone",
    content: "Achieved the first big milestone in Q1 2023.",
    image: "../cover1.jpg",
  },
];

const navItems = [
  { name: "Home", link: "/home" },
  { name: "Committees", link: "" },
  { name: "Notice", link: "/notice" },
  { name: "Fests", link: "/fests" },
  { name: "Events", link: "/events" },
  { name: "Blogs", link: "/blogs" },
  { name: "Alumni", link: "/alumni" },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <FloatingNav navItems={navItems} />
      {/* <FloatingNav navItems={navItems} /> */}
      <div className="flex-grow p-4">
        <Timeline data={data} />
      </div>
      <Footer />
    </div>
  );
}

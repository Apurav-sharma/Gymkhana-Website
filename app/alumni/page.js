'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingNav } from '../components/ui/floating-navbar';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import Footer from '../foot/footer';

function Page() {
  const router = useRouter();
  const images = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg", "/pic4.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleContactClick = () => {
    router.push('/alumni/contact');
  };

  const handleLoginClick = () => {
    router.push('/alumni/login');
  };

  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Committees", link: "/committees" },
    { name: "Notice", link: "/notice" },
    { name: "Fests", link: "/fests" },
    { name: "Events", link: "/events" },
    { name: "Blogs", link: "/blogs" },
    { name: "Alumni", link: "/alumni" },
  ];

  return (
    <div>
    <div className="bg-gray-950 min-h-screen flex flex-col justify-between p-[15vh]">
      <FloatingNav navItems={navItems} />

      {/* Image Section on Top */}
      <motion.section
            className="py-[5vh] w-full h-[70vh] overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-full">
              <AnimatePresence>
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt={`Slider ${currentImage + 1}`}
                  className="absolute w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>
            </div>
          </motion.section>


      {/* Welcome Section */}
      <main className="flex flex-col items-center text-white px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500 mb-4">
            Welcome to the Alumni Page
          </h1>
          <p className="text-lg lg:text-2xl font-light text-gray-300 italic">
            We are thrilled to have you as part of our alumni family
          </p>
        </div>

        {/* Alumni Buttons Section */}
        <div className="w-full lg:w-2/3 bg-black p-8 rounded-lg shadow-[0_4px_30px_rgba(138,43,226,0.8)] mt-auto mb-8">
          <ul className="space-y-4 text-lg">
            <li>
              <button
                className="w-full bg-gradient-to-r from-purple-700 to-violet-700 text-white font-semibold py-3 px-6 rounded-lg neon-button"
              >
                Memories
              </button>
            </li>
            <li>
              <button
                className="w-full bg-gradient-to-r from-purple-700 to-violet-700 text-white font-semibold py-3 px-6 rounded-lg neon-button"
              >
                Reunion
              </button>
            </li>
            <li>
              <button
                onClick={handleContactClick}
                className="w-full bg-gradient-to-r from-purple-700 to-violet-700 text-white font-semibold py-3 px-6 rounded-lg neon-button"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={handleLoginClick}
                className="w-full bg-gradient-to-r from-purple-700 to-violet-700 text-white font-semibold py-3 px-6 rounded-lg neon-button"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </main>

      {/* Tailwind Custom Classes for Neon Effect */}
      <style jsx>{`
        .neon-button {
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.7);
          transition: box-shadow 0.3s ease;
        }
        .neon-button:hover {
          box-shadow: 0 0 30px rgba(138, 43, 226, 1);
        }
      `}</style>
    </div>
    <Footer/>
    </div>
  );
}

export default Page;
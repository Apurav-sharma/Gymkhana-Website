"use client";
import { useState } from "react";
import Footer from "../foot/footer";
import { FloatingNav } from "../components/ui/floating-navbar";

function Gallery() {
  const [visibleImagesCount, setVisibleImagesCount] = useState(6);

  const images = [
    "../cover1.jpg",
    "../cover4.jpg",
    "../cover8.jpg",
    "../cover1.jpg",
    "../cover4.jpg",
    "../cover8.jpg",
    "../cover1.jpg",
    "../cover4.jpg",
  ];

  const handleViewMore = () => {
    setVisibleImagesCount((prevCount) => prevCount + 6);
  };

  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Committees", link: "" },
    { name: "Notice", link: "/notice" },
    { name: "Fests", link: "/fests" },
    { name: "Events", link: "/events" },
    { name: "Blogs", link: "/blogs" },
    { name: "Alumni", link: "/alumni" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 sm:px-6 lg:px-8 pt-20">
      <FloatingNav navItems={navItems} />
      <h1 className="text-6xl font-bold my-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 leading-normal">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {images.slice(0, visibleImagesCount).map((image, index) => (
          <div key={index} className="w-full">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      {visibleImagesCount < images.length && (
        <button
          onClick={handleViewMore}
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View More
        </button>
      )}
      <Footer/>
    </div>
  );
}

export default Gallery;

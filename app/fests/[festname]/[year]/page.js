"use client";
import { FloatingNav } from "../../../components/ui/floating-navbar";
import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
import Footer from "../../../foot/footer";
import { useParams } from "next/navigation";
import axios from "axios";

function fests() {
  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Notice", link: "/notice" },
    { name: "Committees", link: "" },
    { name: "Fests", link: "" },
    { name: "Events", link: "/events" },
    { name: "Blogs", link: "/blogs" },
    { name: "Alumni", link: "/alumni" },
  ];
  const params = useParams();
  const [festData, setdata] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // console.log(params);
  const { festname, year } = params;
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/fest/${festname}/${year}`);
      // console.log(res.data);
      setdata(res.data);
    }
    fetch();
  }, []);
  
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const loading = "Loading ... ";
  // console.log(festData[0]);
  var flag = true;

  return (
    <div className="h-auto">
      <FloatingNav navItems={navItems} />
      <div className="mt-[15vh] h-[50vh] w-auto flex items-center justify-center bg-[url('/cover1.jpg')] bg-cover bg-center">
        <span className="text-5xl font-bold bg-gradient-to-r from-[#ff0080] via-[#6a0dad] to-[#0070f3] text-transparent bg-clip-text">{festData[0] ? festData[0].festname : loading}</span>
      </div>
      <div className="p-[5vh] grid grid-cols-1 sm:grid-cols-2 gap-6">
        {festData.map((fest) => {
          let current = isSmallScreen ? true : flag;
          if (!isSmallScreen) flag = !flag;
          return (
            <>
              {current ? (
                <>
                  <div className="bg-gray-800 shadow-lg shadow-gray-700 p-[5vh] rounded-3xl mt-[10vh] h-auto lg:min-h-[50vh] break-words flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-700 text-transparent bg-clip-text mb-[5vh]">
                      {fest ? fest.commiteename : loading}
                    </h2>
                    <p className="text-justify text-gray-400">
                      {fest ? fest.description : loading}
                    </p>
                  </div>
                  <div className="sm:mt-[10vh] flex justify-center items-center lg:min-h-[50vh]">
                    <img src={fest.logo} alt="Workshop Image" className="lg:max-w-[40vw] lg:max-h-[40vh]"/>
                  </div>
                </>
              ) : (
                <>
                  <div className="sm:mt-[10vh] flex justify-center items-center lg:min-h-[50vh]">
                    <img src={fest.logo} alt="Workshop Image" className="lg:max-w-[40vw] lg:max-h-[40vh]"/>
                  </div>
                  <div className="bg-gray-800 shadow-lg shadow-gray-700 p-[5vh] rounded-3xl mt-[10vh] h-auto lg:min-h-[50vh] break-words flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-700 text-transparent bg-clip-text mb-[5vh]">
                      {fest ? fest.commiteename : loading}
                    </h2>
                    <p className="text-justify text-gray-400">
                      {fest ? fest.description : loading}
                    </p>
                  </div>
                </>
              )}
            </>
          )
        }
        )}
        {/* <div className="bg-gray-800 shadow-lg shadow-gray-700 p-10 rounded-3xl h-[50vh] break-words flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-700 text-transparent bg-clip-text mb-[5vh]">
            {festData[0] ? festData[0].commiteename : loading}
          </h2>
          <p className="text-justify text-gray-400">
            {festData[0] ? festData[0].description : loading}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src="/chrome.png" alt="Workshop Image" />
        </div>
        <div className="flex justify-center items-center">
          <img src="/cover1.jpg" alt="Workshop Image" />
        </div>
        <div className="bg-gray-800 shadow-lg shadow-gray-700 p-10 rounded-3xl h-[50vh] break-words flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-700 text-transparent bg-clip-text mb-[5vh]">
            WORKSHOP TEXT CONTENT
          </h2>
          <p className="text-justify text-gray-400">
            {festData[0] ? festData[0].description : loading}
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg shadow-gray-700 p-10 rounded-3xl h-[50vh] break-words flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-700 text-transparent bg-clip-text mb-[5vh]">
            {festData[0] ? festData[0].commiteename : loading}
          </h2>
          <p className="text-justify text-gray-400">
            {festData[0] ? festData[0].description : loading}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src="/chrome.png" alt="Workshop Image" />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
export default fests;
"use client";
import { FloatingNav } from "../components/ui/floating-navbar";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Footer from "../foot/footer";

function blogs() {
  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Committees", link: "" },
    { name: "Notice", link: "/notice" },
    { name: "Fests", link: "" },
    { name: "Events", link: "/events" },
    { name: "Blogs", link: "/blogs" },
    { name: "Alumni", link: "/alumni" },
  ];

  const [selectedTag, setSelectedTag] = useState("");
  const [blog, setblog] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const fetched = await axios.get("/api/blog");
        // console.log(fetched.data);
        setblog(fetched.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const tags = [
    "Technical",
    "Sports",
    "Cultural",
    "Academics",
    "Student Welfare",
  ];

  const blogsx = (e) => {
    setSelectedTag(e.target.value);
  };

  const convert = (id) => {
    const number = parseInt(id, 16);
    return number % 3;
  };

  return (
    <div>
    <div className="flex flex-wrap justify-evenly h-auto container rounded-3xl">
      <FloatingNav navItems={navItems} />
      <h1 className="mt-[17vh] bg-clip-text text-[#afbcc9] absolute font-bold center text-5xl">
        BLOGS
      </h1>
      <div className="mt-[30vh] absolute right-[5vw] w-auto flex max-w-fit rounded-full bg-[#0D1B2A] pr-[2vw] pl-[2vw] py-[1vh] justify-evenly text-white shadow-md shadow-gray-500">
        <select
          value={selectedTag}
          onChange={blogsx}
          className="bg-[#0D1B2A] outline-none"
        >
          <option value="">Search Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className="p-[1vh] h-auto max-h-[100vh] flex-col rounded-3xl overflow-y-scroll overflow-x-clip no-scrollbar mt-[40vh] mb-[5vh]">
        {blog
          .filter(
            (post) =>
              (!selectedTag || post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())) &&
              convert(post._id) == 1
          )
          .map((post) => (
            <div
              key={post._id}
              className="sm:w-[45vw] md:w-[65vw] lg:max-w-[25vw] overflow-x-clip no-scrollbar h-auto w-full mb-[5vh] rounded-3xl p-[5vh] bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-md shadow-gray-500 hover:scale-105 hover:shadow-lg hover:shadow-slate-500"
            >
              <h2 className="text-2xl font-bold text-white break-words">
                {post.title}
              </h2>
              <h1 className="mb-[0.6vh] text-right text-gray-300">
                {post.author}
              </h1>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-300 font-semibold text-black px-[1vw] py-[0.5vh] rounded-full text-sm mt-[2vh] mr-[0.5vw]"
                >
                  {tag}
                </span>
              ))}
              <h3 className="text-gray-400 text-left break-words mt-[3vh]">
                {post.content}
              </h3>
            </div>
          ))}
      </div>
      <div className="p-[1vh] h-auto max-h-[100vh] flex-col rounded-3xl overflow-y-scroll overflow-x-clip no-scrollbar mb-[5vh] sm:mt-[40vh]">
        {blog
          .filter(
            (post) =>
              (!selectedTag || post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())) &&
              convert(post._id) == 2
          )
          .map((post) => (
            <div
              key={post._id}
              className="sm:w-[45vw] md:w-[65vw] lg:max-w-[25vw] overflow-x-clip no-scrollbar h-auto w-full mb-[5vh] rounded-3xl p-[5vh] bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-md shadow-gray-500 hover:scale-105 hover:shadow-lg hover:shadow-slate-500"
            >
              <h2 className="text-2xl font-bold text-white break-words">
                {post.title}
              </h2>
              <h1 className="mb-[0.6vh] text-right text-gray-300">
                {post.author}
              </h1>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-300 font-semibold text-black px-[1vw] py-[0.5vh] rounded-full text-sm mt-[2vh] mr-[0.5vw]"
                >
                  {tag}
                </span>
              ))}
              <h3 className="text-gray-400 text-left break-words mt-[3vh]">
                {post.text}
              </h3>
            </div>
          ))}
      </div>
      <div className="p-[1vh] h-auto max-h-[100vh] flex-col rounded-3xl overflow-y-scroll overflow-x-clip no-scrollbar sm:mt-[40vh]">
        {blog
          .filter(
            (post) =>
              (!selectedTag || post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())) &&
              convert(post._id) == 0
          )
          .map((post) => (
            <div
              key={post._id}
              className="sm:w-[45vw] md:w-[65vw] lg:max-w-[25vw] overflow-x-clip no-scrollbar h-auto w-full mb-[5vh] rounded-3xl p-[5vh] bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-md shadow-gray-500 hover:scale-105 hover:shadow-lg hover:shadow-slate-500"
            >
              <h2 className="text-2xl font-bold text-white break-words">
                {post.title}
              </h2>
              <h1 className="mb-[0.6vh] text-right text-gray-300">
                {post.author}
              </h1>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-300 font-semibold text-black px-[1vw] py-[0.5vh] rounded-full text-sm mt-[2vh] mr-[0.5vw]"
                >
                  {tag}
                </span>
              ))}
              <h3 className="text-gray-400 text-left break-words mt-[3vh]">
                {post.text}
              </h3>
            </div>
          ))}
      </div>
    </div>
    <Footer />
    </div>
  );
}
export default blogs;

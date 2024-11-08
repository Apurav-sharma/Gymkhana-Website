"use client"; // Ensure this is treated as a Client Component

import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const renderOnce = true;
  const [Admin, setAdmin] = useState({})
  const [load, setLoad] = useState(false);
    useEffect(() => {
      const fetchAdmin = async () => {
        try {
          const adminData = await JSON.parse(sessionStorage.getItem("Gymkhana_Admin"));
          if (adminData) {
            // console.log(adminData);
            setLoad(true);
            setAdmin(adminData);
          }
          else {
            console.log("not found");
            window.location.replace("/admin/login")
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchAdmin();
    },[renderOnce])
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Blog submitted successfully!");
    await axios.post("/api/blog", {
      title,
      author,
      text: description,
      tags: selectedTags,
    });
    router.back(); // Navigate back to the previous page after submission
  };

  return (
    <>
      {
        load && <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Add Blog</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
          {/* Title of the Blog */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title of the Blog</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
  
          {/* Author of the Blog */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Author of the Blog</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
  
          {/* Description of the Blog */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description of the Blog</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter blog description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />
          </div>
  
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap space-x-4">
              {["Technical", "Sports", "Cultural", "Academics", "Student Welfare"].map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
  
          {/* Submit Button */}
            <div className="flex flex-col justify-center items-center">
            <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
            </button>
            <button onClick={() =>window.location.replace("/admin")} className={`bg-red-500 p-2 text-white mt-2 w-64 hover:bg-red-300 `}>
                Back to Admin Home
        </button>
            </div>
        </form>
      </div>
      }
    </>
  );
};

export default AddBlog;

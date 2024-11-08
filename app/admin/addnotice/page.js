"use client"; // Ensure this is treated as a Client Component

import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();
  const renderOnce = true;
  const [Admin, setAdmin] = useState({})
  const [load, setLoad] = useState(false)
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
    const fullDate = `${day}/${month}/${year}`;

    // You can perform any submission logic here, such as sending data to a backend.
    alert("Notice submitted successfully!");
    // console.log({
    //   title,
    //   link,
    //   eventDetail,
    //   fullDate,
    // });
    await axios.post("/api/notice", {
      title: title,
      time: fullDate,
      link: link,
      text: eventDetail,
    });

    router.back(); // Navigate back to the previous page after submission
  };

  return (
    <>
      {
        load && <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Add Notice</h1>
  
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
          {/* Title of the Notice */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title of the Notice</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
  
          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
  
          {/* Event Detail */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notice Detail</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter event details"
              value={eventDetail}
              onChange={(e) => setEventDetail(e.target.value)}
              rows="4"
              required
            />
          </div>
  
          {/* Date (DD/MM/YYYY) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date (DD/MM/YYYY)</label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-16 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                maxLength="2"
                required
              />
              <span className="py-2">/</span>
              <input
                type="text"
                className="w-16 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                maxLength="2"
                required
              />
              <span className="py-2">/</span>
              <input
                type="text"
                className="w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                maxLength="4"
                required
              />
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

export default AddNotice;

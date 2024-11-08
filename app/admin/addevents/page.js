"use client"; // Ensure this is treated as a Client Component

import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [image, setImage] = useState(null);
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
    alert("Event submitted successfully!");
   
    var formData = new FormData();
    formData.append("file", image);
    var image_url = await axios.post("/api/upload/event", formData);
    // console.log(image_url);

    await axios.post("/api/event", {
      title: title,
      image: image_url.data.path,
      text: eventDetail,
      date: fullDate
    });

    router.back();
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <>
      {
        load && <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Add Event</h1>
  
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
          {/* Title of the Event */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title of the Event</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
  
          {/* Event Detail */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Detail</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter event details"
              value={eventDetail}
              onChange={(e) => setEventDetail(e.target.value)}
              rows="4"
              required
            />
          </div>
  
          {/* Event Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image of the Event</label>
            <input
              type="file"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleImageChange}
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

export default AddEvent;

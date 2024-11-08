"use client"; // Ensure this is treated as a Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Background } from "@tsparticles/engine";

const AddFest = () => {
  const [committeeName, setCommitteeName] = useState("");
  const [festName, setFestName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [theme, setTheme] = useState(null);

  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
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
  }, [renderOnce])
  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const savedDescription = localStorage.getItem("committeeDescription") || "";

      setDescription(savedDescription);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("committeeDescription", description);
    }
  }, [description, isMounted]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform any submission logic here
    alert("Fest submitted successfully!");

    const formData1 = new FormData();
    const formData = new FormData();
    formData1.append("file", theme);
    formData.append("file", logo);

    var url_theme = await axios.post("/api/upload/event", formData1);
    var url_logo = await axios.post("/api/upload/event", formData);
    await axios.post("/api/fest", {
      commiteename: committeeName,
      festname: festName,
      description,
      logo: url_logo.data.path,
      background: url_theme.data.path,
      year: year
    });

    router.back();
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.files[0]);
  };

  const handleAddEventClick = () => {
    router.push("/admin/addevents");
  };
  const [addEvent, setAddEvent] = useState(false);
  return (
    <>
      {
        load && <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
          <h1 className="text-3xl font-bold mb-6">Add Fest</h1>

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
            {/* Committee Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Committee Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter committee name [Lower case only]"
                value={committeeName}
                onChange={(e) => setCommitteeName(e.target.value)}
                required
              />
            </div>

            {/* Fest Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fest Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter fest name"
                value={festName}
                onChange={(e) => setFestName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fest Year</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Year"
                value={festName}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            {/* Description of the Event */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description of the Fest</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter fest description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
              />
            </div>

            {/* Add Events Button */}
            <div>
              <button
                type="button"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setAddEvent(!addEvent)}
              >
                {!addEvent ? "Add Event" : "Cancel"}
              </button>
            </div>
            {
              addEvent && (
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                <div>
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
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Create Event
                      </button>
                  </form>
                </div>
              )
            }
            {/* Logo of the Fest */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo of the Fest</label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleLogoChange}
                required
              />
            </div>

            {/* Background Theme (Image) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Theme</label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleThemeChange}
                required
              />
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </form>
        </div>
      }
    </>
  );
};

export default AddFest;

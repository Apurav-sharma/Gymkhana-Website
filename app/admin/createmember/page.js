"use client"; // Ensure this is treated as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateMember = ({presidentOrNot}) => {
  const [isPresidentForm, setIsPresidentForm] = useState(false); // State to toggle forms
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    alert("Submission successful!"); // Show success message
    router.back(); // Navigate back to the previous page
  };
  if (presidentOrNot === false) {
    
  }
  const renderOnce = true;
  const [Admin, setAdmin] = useState({})
    useEffect(() => {
      const fetchAdmin = async () => {
        try {
          const adminData = await JSON.parse(sessionStorage.getItem("Gymkhana_Admin"));
          if (adminData) {
            // console.log(adminData);
            setAdmin(adminData);
          }
          else {
            console.log("not found");
            window.location.replace("/home")
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchAdmin();
    },[renderOnce])
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6">
        {isPresidentForm ? "Create President" : "Create Member"}
      </h1>

      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 ${
            !isPresidentForm ? "bg-blue-500" : "bg-gray-200"
          } text-white rounded`}
          onClick={() => setIsPresidentForm(false)}
        >
          Create Member
        </button>
        <button
          className={`py-2 px-4 ${
            isPresidentForm ? "bg-blue-500" : "bg-gray-200"
          } text-white rounded`}
          onClick={() => setIsPresidentForm(true)}
        >
          Create President
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
        {/* Conditionally Render Forms */}
        {isPresidentForm ? (
          <>
            {/* President Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700">President Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter president name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn ID Link</label>
              <input
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter LinkedIn link"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram ID Link</label>
              <input
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Instagram link"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </>
        ) : (
          <>
            {/* Member Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Committee Post</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter committee post"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Club Post</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter club post"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Committee Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter committee name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Club Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter club name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn ID Link</label>
              <input
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter LinkedIn link"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram ID Link</label>
              <input
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Instagram link"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMember;

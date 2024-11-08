"use client"; // Ensure this is treated as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const CreateSecretory = ({ presidentOrNot }) => {
  const router = useRouter();
  const [successSubmit,setSuccessSubmit] = useState(false);
  const [message, setMessage] = useState("")
  const uploadFile = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      // console.log(event.target.fileInput)
      const fileInput = event.target.fileInput.files[0];
      formData.set('file', fileInput);
      const response = await axios.post('/api/upload/member', formData);
      // console.log(response.data.path);
      setPath(response.data.path);
      
      const newResponse = await axios.post("/api/member", {
        name: name,
        linkedinId: linkedInid,
        instagram: Instagram,
        image: response.data.path,
        clubPost: "Secretory",
      })
      // console.log(newResponse.data.data._id);
      sessionStorage.setItem("SecretoryID", JSON.stringify(newResponse.data.data._id));
      // const ans = await JSON.parse(sessionStorage.getItem("SecretoryID"));
      // console.log(ans);
      // console.log(newResponse.data);
      setSuccessSubmit(true);
    }
    catch (error) {
      setMessage(error.message);
      console.log("cannot upload file");
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

  };
  const [path, setPath] = useState("");
  const [name, setName] = useState("");
  const [linkedInid, setLinkedInid] = useState("");
  const [Instagram, setInstagram] = useState("")
  const [image, setImage] = useState(null);
  if (successSubmit===false) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Create Secretory</h1>
        <h3>All the fields are required!!</h3>
  
        {/* Form */}
        <form onSubmit={uploadFile} className="space-y-6 w-full max-w-lg">
          {/* Member Form */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
                // console.log(name)
            }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter name"
              required
            />
          </div>
  
  
  
  
  
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn ID Link</label>
            <input
              type="text"
              onChange={(e) => {
                setLinkedInid(e.target.value);
                // console.log(linkedInid);
            }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter LinkedIn link"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram ID Link</label>
            <input
              type="text"
              onChange={(e) => {
                setInstagram(e.target.value);
                // console.log(Instagram);
            }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Instagram link"
              required
            />
          </div>
  
          <div>
              
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div>
              [size: 300x300px]
            </div>
            <input
              type="file"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
              id="fileInput"
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
          {message!=="" && <p className="text-red-500">{message}</p>}
        </form>
  
      </div>
    );
 }
  else {
    return (
      <div className="m-auto bg-blue-500 w-72 p-8 mr-1 mb-8">
        SuccessFully created Secretory
      </div>
    );
  }
};

export default CreateSecretory;

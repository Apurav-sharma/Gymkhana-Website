"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateMember from "../createmember/page";
import CreateSecretory from "./createSecretory";
import CreateJointSecretory from "./createJointSecretory";
import axios from "axios";
const CreateClub = () => {
  const router = useRouter();
  const renderOnce = true;
  const [clubName, setClubName] = useState("");
  const [committeeName, setCommitteeName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [admin, setAdmin] = useState({});
  const [isMounted, setIsMounted] = useState(false);
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
  const redirectToHome = () => {
    setTimeout(() => {
      window.location.replace('/admin')
    }, 3000);
  }
  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const savedClubName = sessionStorage.getItem("clubName") || "";
      const savedCommitteeName = sessionStorage.getItem("committeeName") || "";
      const savedDescription = sessionStorage.getItem("clubDescription") || "";

      setClubName(savedClubName);
      setCommitteeName(savedCommitteeName);
      setDescription(savedDescription);
    }
  }, []);
   useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem("clubName", clubName);
      sessionStorage.setItem("committeeName", committeeName);
      sessionStorage.setItem("clubDescription", description);
    }
  }, [clubName, committeeName, description, isMounted]);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  
  const handleAddMember = () => {
    router.push("/admin/createmember");
  };
  const [completedWork, setCompletedWork] = useState(false);
  const [Secretory, setSecretory] = useState("");
  const [JointSecretory, setJointSecretory] = useState("");
  const [isfilled, setIsfilled] = useState(false);
  const [formNotFilled, setFormNotFilled] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    // alert("Club created successfully!");
    console.log('doing');
    const sid = sessionStorage.getItem("SecretoryID");
    const jid = sessionStorage.getItem("JointSecretoryID");
    // console.log(sid,jid);
    if (sid === null || jid === null) {
      setFormNotFilled(true);
      console.log('hello world');
      return;
    }
    // console.log(e.target.photo.files[0]);
    const formData = new FormData();
    const fileInput=e.target.photo.files[0];
    formData.set("file", fileInput);
    const response = await axios.post('/api/upload/club', formData);
    console.log(response.data.path);
    const parsedSid = await JSON.parse(sid);
    const parsedJid = await JSON.parse(jid);

    const newResponse = await axios.post('/api/club', {
      name: clubName,
      committee: committeeName.toLowerCase(),
      description: description,
      logo: response.data.path,
      secretory: parsedSid,
      jsecretory: parsedJid,
    })
    setCompletedWork(true); 
    setDescription("");
    setClubName("");
    setCommitteeName("");
  }
  if (load) {
    if (!completedWork) {
    
      return (
        
        <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
          <div className="text-4xl font-extrabold">
            Create Secretory and Joint Secretory first to create club.
          </div>
          <div className="text-red-600 mt-4 mb-0">
            Warning! Please check the font-case before entering and data
          </div>
          <div className="grid grid-cols-2 mt-0">
            <CreateSecretory/>
            <CreateJointSecretory/>
          </div>
    
          <h1 className="text-3xl font-bold mb-6">Create Club</h1>
    
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">Club Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter club name"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Committee Name [enter in lower case eg: 'technical','academics',etc...]</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter committee name"
                value={committeeName}
                onChange={(e) => setCommitteeName(e.target.value)}
                required
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Club Description</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Club Logo [300x300px would be best size]</label>
              <input
                type="file"
                name="logo"
                id="photo"
                // onChange={handleLogoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
    
            {
              formNotFilled &&
              <div className="text-red-600 mt-4 mb-0">
                Please fill the Joint Secretory and the Secretory first.
              </div>
            }
    
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="m-auto text-3xl font-bold text-white">
          Club Successfully Created! Redirecting to Admin Home...
          {redirectToHome()}
        </div>
      )
    }
  } else {
    return <div>
      hello
    </div>
  }
  
};

export default CreateClub;

"use client"
import Link from 'next/link';
import React,{useEffect,useState} from 'react';
const AdminPanel = ({ create }) => {
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
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-lg mb">Welcome, <span className='text-red-800 text-xl'>{Admin.username}</span></p>
      <p className="text-lg mb-8 text-red-700">Warning! The panel is highly case-sensitive, please check spelling twice before entering/updating anything!!</p>
      <div className="flex flex-col space-y-4">
        <Link href="/admin/updatecommittee">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Update Committee [Change members]
          </button>
        </Link>
        <Link href="/admin/createclub">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Create Club
          </button>
        </Link>
        <Link href="/admin/deleteclub">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Delete Club
          </button>
        </Link>
        <Link href="/admin/addblogs">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Add Blogs
          </button>
        </Link>
        <Link href="/admin/addnotice">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Add Notice
          </button>
        </Link>
        <Link href="/admin/addevents">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Add Events
          </button>
        </Link>
        <Link href="/admin/addfests">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Add Fests
          </button>
        </Link>
        <Link href="/admin/create-alumni">
          <button className="px-4 py-2 bg-blue-500 w-96 text-white rounded hover:bg-blue-600">
            Create Alumni
          </button>
        </Link>
      </div>
      
    </div>
  );
};

export default AdminPanel;

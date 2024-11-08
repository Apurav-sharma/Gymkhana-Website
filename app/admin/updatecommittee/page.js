"use client"
import axios from 'axios';
import { useState, useEffect } from 'react'
import React from 'react';
const updateCommittee = () => {
  const [committee, setCommittee] = useState('');
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [deleteOperation, setDeleteOperation] = useState(false);
  const [createMember, setCreateMember] = useState(false);

  const [operationCompleted, setOperationCompleted] = useState(false);
  // const [loader, setLoader] = useState(true);
  const redirectToHome = () => {
    window.location.replace('/admin');
  }
  const renderOnce = true;
  const [load, setLoad] = useState(false);
  const [Admin, setAdmin] = useState({})
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await JSON.parse(sessionStorage.getItem("Gymkhana_Admin"));
        if (adminData) {
          // console.log(adminData);
          setAdmin(adminData);
          setLoad(true);
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
  const deleteMember = async (id) => {
    try {
      const response = await axios.delete(`/api/member/${id}`);
      setDeleteOperation(true);
      // setTimeout(() => {
      //   redirectToHome();        
      // }, 2000);
    }
    catch (error) {
      console.error('Error deleting member:', error);
    }
  }
  const handleCommitteeChange = (value) => {
    setCommittee(value);
  }
  const fetchDetails = async () => {
    try {
      const response = await axios.get(`/api/member/committee/technical`);
      setFetchedMembers(response.data.data);
    }
    catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    if (committee !== '') {
      console.log(committee);
      fetchDetails();
    }
  }, [committee]);

  const handleAddMember = async () => {
    if (committee !== '') {
      setCreateMember(true);
    }
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const committeePost = e.target.committeePost.value;
    const linkedin_id = e.target.linkedin_id.value;
    const instagram_id = e.target.instagram_id.value;
    const committeeName = committee.toLowerCase();
    const formData = new FormData();
    formData.set('file', e.target.file.files[0]);
    try {
      const response = await axios.post('/api/upload/member', formData);
      console.log(response.data);
      const response2 = await axios.post(`/api/member/`, {
        name: name,
        linkedinId: linkedin_id,
        instagram: instagram_id,
        image: response.data.path,
        committeePost: committeePost,
        committee: committeeName,
      });
      console.log(response2.data);
      setOperationCompleted(true);
    }
    catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      {load && <>
        {operationCompleted && <div className='text-white text-3xl'>Successfully added the member... Redirecting to Admin Home{setTimeout(() => { redirectToHome() }, 2000)}</div>}
        {
          !operationCompleted && (
            <div className='bg-white w-[100vw] overflow-x-hidden flex  flex-col items-center h-full min-h-[100vh] p-8'>
              <h1 className='text-4xl absolute top-5'>
                Admin Panel
              </h1>
              <div className='text-3xl mt-16'>
                Update Committee
              </div>
              {
                committee === '' &&
                (
                  <div className='flex justify-center items-center flex-col'>
                    <h3 className=' text-xl m-2'>
                      Select Committee:
                    </h3>
                    <div>
                      <button onClick={(e) => handleCommitteeChange('technical')} className={`bg-blue-500 px-4 mx-4 py-2  hover:bg-blue-300 rounded-sm text-white w-52 `}>
                        Technical
                      </button>
                      <button onClick={(e) => handleCommitteeChange('cultural')} className={`bg-blue-500 px-4 mx-4 py-2  hover:bg-blue-300 rounded-sm text-white w-52 `}>
                        Cultural
                      </button>
                      <button onClick={(e) => handleCommitteeChange('sports')} className={`bg-blue-500 px-4 mx-4 py-2  hover:bg-blue-300 rounded-sm text-white w-52 `}>
                        Sports
                      </button>
                      <button onClick={(e) => handleCommitteeChange('academics')} className={`bg-blue-500 px-4 mx-4 py-2 hover:bg-blue-300  rounded-sm text-white w-52 `}>
                        Academics
                      </button>
                      <button onClick={(e) => handleCommitteeChange('student welfare')} className={`bg-blue-500 px-4 mx-4 py-2 hover:bg-blue-300  rounded-sm text-white w-52 `}>
                        Student Welfare
                      </button>
                    </div>
                  </div>
                )
              }
              <div>
              </div>
              {
                deleteOperation && (
                  <div className='text-center text-red-500 mt-10'>
                    Member deleted successfully. Redirecting to Admin Home

                  </div>
                )
              }

              {
                createMember && (
                  <form onSubmit={(e) => { handleFormSubmit(e) }} className="space-y-6 w-full max-w-lg border border-black p-4 m-2">
                    {/* Conditionally Render Forms */}

                    <>
                      <div className='text-2xl'>
                        Create a new Member
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          id="name"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Committee Post</label>
                        <input
                          id="committeePost"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter committee post"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">LinkedIn ID Link</label>
                        <input
                          id='linkedin_id'
                          type="url"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter LinkedIn link"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Instagram ID Link</label>
                        <input
                          id='instagram_id'
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
                          id="file"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                    </>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Submit
                    </button>
                  </form>
                )
              }
              <h3 className='text-3xl'>{committee.toUpperCase()}</h3>
              <div className="flex gap-20">
                <button onClick={() => handleAddMember()} className={`bg-red-500 p-2 text-white mt-2 w-64 ${committee === '' ? "cursor-not-allowed" : ""} hover:bg-red-300 `}>
                  Add Member
                </button>
                <button onClick={() => window.location.replace("/admin")} className={`bg-red-500 p-2 text-white mt-2 w-64 hover:bg-red-300 `}>
                  Back to Admin Home
                </button>
              </div>
              <div className='border flex flex-col justify-center items-center w-[50vw] h-[60vh] mt-4 border-black mb-4 overflow-scroll pt-16'>

                {fetchedMembers.length > 0 && (
                  fetchedMembers.map((item) => {
                    return (
                      <div key={item._id} className='bg-gray-200 m-2 p-2 w-[96%] flex justify-between'>
                        <span className='text-lg'>{item.name}</span>
                        <span className='ml-5'>{item.committeePost}</span>
                        <span className=''><button onClick={() => { deleteMember(item._id) }} className='bg-red-500 text-white px-2 py-1'>Delete</button></span>
                      </div>
                    );
                  }
                  )
                )}
              </div>
            </div>
          )
        }
      </>}
    </>
  )
}

export default updateCommittee

"use client"
import axios from 'axios';
import { useState, useEffect } from 'react'
import React from 'react';
const deleteClub = () => {
  const [Club, setClub] = useState('');
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [deleteOperation, setDeleteOperation] = useState(false);
  const [createMember, setCreateMember] = useState(false);
  const [operationCompleted, setOperationCompleted] = useState(false);
  // const [loader, setLoader] = useState(true);
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
  const redirectToHome = () => {
    window.location.replace('/admin');
  }
  const deleteMember = async (id) => {
    try {
      const response = await axios.delete(`/api/club/delete/${id}`);
      setDeleteOperation(true);
    }
    catch (error) {
      console.error('Error deleting member:', error);
    }
  }
  const handleClubChange = (value) => {
    setClub(value);
  }
  const fetchDetails = async () => {
    try {
      const response = await axios.get(`/api/club/${Club}`);
      setFetchedMembers(response.data.data);
    }
    catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    if (Club !== '') {
      console.log(Club);
      fetchDetails();
    }
  }, [Club]);


  return (
    <>
      {
        load && <>
        {operationCompleted && <div className='text-white text-3xl'>Successfully added the member... Redirecting to Admin Home{setTimeout(() => { redirectToHome() }, 2000)}</div>}
        {
          !operationCompleted && (
            <div className='bg-white w-[100vw] overflow-x-hidden flex  flex-col items-center h-full min-h-[100vh] p-8'>
              <h1 className='text-4xl absolute top-5'>
                Admin Panel
              </h1>
              <div className='text-3xl mt-16'>
                delete Club
              </div>
              {
                Club === '' &&
                (
                  <div className='flex justify-center items-center flex-col'>
                    <h3 className=' text-xl m-2'>
                      Select Club:
                    </h3>
                    <div>
                      <button onClick={(e) => handleClubChange('technical')} className={`bg-blue-500 px-4 mx-4 py-2  hover:bg-blue-300 rounded-sm text-white w-52 `}>
                        Technical
                      </button>
                      <button onClick={(e) => handleClubChange('cultural')} className={`bg-blue-500 px-4 mx-4 py-2  hover:bg-blue-300 rounded-sm text-white w-52 `}>
                        Cultural
                      </button>
                      <button onClick={(e) => handleClubChange('sports')} className={`bg-blue-500 px-4 mx-4 py-2  hover:bg-blue-300 rounded-sm text-white w-52 `}>
                        Sports
                      </button>
                      <button onClick={(e) => handleClubChange('academics')} className={`bg-blue-500 px-4 mx-4 py-2 hover:bg-blue-300  rounded-sm text-white w-52 `}>
                        Academics
                      </button>
                      <button onClick={(e) => handleClubChange('student welfare')} className={`bg-blue-500 px-4 mx-4 py-2 hover:bg-blue-300  rounded-sm text-white w-52 `}>
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
                    Club deleted successfully. Redirecting to Admin Home
  
                  </div>
                )
              }
  
              
              <h3 className='text-3xl'>{Club.toUpperCase()}</h3>
              <div className="flex gap-20">
              
              <button onClick={() =>window.location.replace("/admin")} className={`bg-red-500 p-2 text-white mt-2 w-64 hover:bg-red-300 `}>
                Back to Admin Home
              </button>
              </div>
              <div className='border flex flex-col justify-center items-center w-[50vw] h-[60vh] mt-4 border-black mb-4 overflow-scroll pt-16'>
  
                {fetchedMembers.length > 0 && (
                  fetchedMembers.map((item) => {
                    return (
                      <div key={item._id} className='bg-gray-200 m-2 p-2 w-[96%] flex justify-between'>
                        <span className='text-lg'>{item.name}</span>
                        <span className='ml-5'>{item.ClubPost}</span>
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
      </>
      }
    </>
  )
}

export default deleteClub

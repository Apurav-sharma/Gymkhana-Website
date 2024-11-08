'use client';

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import axios from 'axios';

function ContactUs() {
  const [alumniData, setData] = useState([]);
  // const alumniData = [
  //   {
  //     name: 'John Doe',
  //     photo: '/path/to/photo1.jpg',
  //     linkedin: 'https://linkedin.com/in/johndoe',
  //     company: 'Google'
  //   },
  //   {
  //     name: 'Jane Smith',
  //     photo: '/path/to/photo2.jpg',
  //     linkedin: 'https://linkedin.com/in/janesmith',
  //     company: 'Microsoft'
  //   },
    // Add more alumni data here...
  //];

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:3000/api/alumni');
      console.log(response);
      setData(response.data);
    }
    fetch();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-between text-white">
      <main className="flex flex-col items-center py-16 px-4 w-full">
        <h1 className="text-4xl font-bold mb-10">Contact Us</h1>

        {/* Alumni Cards in a grid format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-4/5">
          {alumniData.map((alum, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-950 p-6 rounded-lg shadow-xl"
              style={{ minHeight: '250px', width: '100%' }}
            >
              <Image
                src={alum.photo}
                alt={alum.name}
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <div className="text-center">
                <h3 className="text-2xl font-semibold">{alum.name}</h3>
                <p className="mt-2">Current Company: {alum.company}</p>
                <a
                  href={alum.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 mt-2 block"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-black text-white text-center py-6 shadow-lg w-full">
        <p className="text-sm font-light">&copy; 2024 Alumni Association</p>
      </footer>
    </div>
  );
}

export default ContactUs;
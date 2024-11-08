"use client";
import { FloatingNav } from '@/app/components/ui/floating-navbar';
import Footer from '@/app/foot/footer';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from "react";

export default function Auth() {
  const [errorMessage, seterrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.username.value;
      const password = e.target.password.value;
      const response = await axios.post('/api/admin/login', { username: username, password: password });
      sessionStorage.setItem("Gymkhana_Admin", JSON.stringify(response.data.body));
      window.location.replace('/admin');
    }
    catch (err) {
      seterrorMessage(err.response.data.body);
    }
    e.target.username.value = "";
    e.target.password.value = "";
  }
  return (
    <>
      <div>
        <Head>
          <title>Sign In</title>
          <meta name="description" content="Authentication page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-[radial-gradient(circle_farthest-side,rgba(0,0,0,.85),rgba(0,0,0,0.7)) opacity-4] min-h-screen flex items-center justify-center flex-col">

            <button onClick={()=>window.location.replace('/home')} className='bg-white px-4 py-2 m-2 rounded-md'>Return Home</button>
          <div className="bg-black color-#ffffff font-sans rounded-lg w-full max-w-md p-8">
            {/* Sign In Section */}
            <h2 className="text-2xl font-bold text-white flex justify-center  mb-4">Sign in to Admin Panel</h2>
            {
              errorMessage !== '' && (
                <div className='text-red-500'>
                  {errorMessage}
                </div>
              )
            }
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-white">
                  Remember me
                </label> */}
                </div>

                {/* <div className="text-sm">
                <a href="#" className="font-medium text-white hover:text-green-500">
                  Forgot Password?
                </a>
              </div> */}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-green-500 rounded-md text-black bg-white hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

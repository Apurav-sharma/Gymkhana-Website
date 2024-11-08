"use client"; // Ensure this is treated as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInstantTransition } from "framer-motion";
import axios from "axios";
const CreateJointSecretory = ({ presidentOrNot }) => {
    const router = useRouter();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [message, setMessage] = useState("")
    const uploadFile = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            // console.log(event.target.fileInput)
            const fileInput = event.target.fileInput.files[0];
            formData.set('file', fileInput);
            const response = await axios.post('/api/upload/member', formData);
            setPath(response.data.path);

            const newResponse = await axios.post("/api/member", {
                name: name,
                linkedinId: linkedInid,
                instagram: Instagram,
                image: response.data.path,
                clubPost: "Joint Secretory",
            })
            // console.log(newResponse.data);
            sessionStorage.setItem("JointSecretoryID", JSON.stringify(newResponse.data.data._id));
            setSubmitSuccess(true);
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
    // const 
    if (submitSuccess === false) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
                <h1 className="text-3xl font-bold mb-6">Create Joint Secretory</h1>
                <h3>All the fields are required!!</h3>
                {/* Form */}
                <form onSubmit={uploadFile} className="space-y-6 w-full max-w-lg">
                    {/* Member Form */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                                // console.log(name)
                            }}
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">LinkedIn ID Link</label>
                        <input
                            onChange={(e) => {
                                setLinkedInid(e.target.value);
                                // console.log(linkedInid);
                            }}
                            type="text"
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
                            id="fileInput"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {/* <button >abs</button> */}
                    </div>
                    {message !== "" && <div>{message}</div>}
                    <button
                        // onClick={uploadFile}
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
    else {
        return (
            <div className="m-auto bg-blue-500 w-84 p-8 mb-8">
                SuccessFully created Joint Secretory
            </div>
        );
    }

};

export default CreateJointSecretory;

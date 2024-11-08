import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Footer from "../foot/footer";
import { FloatingNav } from "../components/ui/floating-navbar";

const Developer = () => {
    const navItems = [
        { name: "Home", link: "/home" },
        { name: "Committees", link: "" },
        { name: "Notice", link: "/notice" },
        { name: "Fests", link: "/fests" },
        { name: "Events", link: "/events" },
        { name: "Blogs", link: "/blogs" },
        { name: "Alumni", link: "/alumni" },
      ];
  return (
    <>
     <FloatingNav navItems={navItems} />

    <div className="container mx-auto mb-[8vh] pt-[20vh] space-y-10">
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden"
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Akshat Sharma</h5>
          <p className="mb-4">Role : Lead Developer</p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden"
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Govind Bhatter</h5>
          <p className="mb-4">Role : Co-Lead </p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/govind_bhatter_19/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="www.linkedin.com/in/govind-bhatter-969a81290"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden"
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Apurav Sharma</h5>
          <p className="mb-4">Role : Backend </p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/apurav___sharma?utm_source=qr&igsh=cXlkZ2thbnVranF2 "
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/apurav07?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden"
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Vedaang Narkhede</h5>
          <p className="mb-4">Role : Frontend Developer</p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden"
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Udit Singh</h5>
          <p className="mb-4">Role : Frontend Developer</p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden"
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Abhi Trivedi</h5>
          <p className="mb-4">Role : Frontend Developer</p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/abhi_trivedii?igsh=cDBxOWhuNWMyOTd1"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhi-trivedi-597255286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden "
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Dhruv Sharma</h5>
          <p className="mb-4">Role : Frontend Developer</p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/dhruv_sh_arm_a?utm_source=qr&igsh=NW9oaHZqenc3c2Ey "
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/dhruv-sharma-6a1a39280"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center bg-gray-800 text-white rounded-lg overflow-hidden"
        style={{ height: "auto" }}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151157233.jpg?w=996&t=st=1718961169~exp=1718961769~hmac=f8f6929ea6c6f930d606ea4c94f025d0fd93b932abeb59356ecceac2fedbc23d"
          }
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
          alt="Govind"
        />
        <div className="p-6 flex flex-col justify-center">
          <h5 className="text-2xl font-bold mb-2">Akarshan</h5>
          <p className="mb-4">Role : Don't Know</p>

          <hr className="border-gray-500 mb-4" />
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Developer;

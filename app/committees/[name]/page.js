"use client";
import Image from "next/image";
import Footer from '@/app/foot/footer';
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import { StickyScroll } from "../../components/ui/sticky-scroll-reveal";
import { AnimatedTooltip } from "../../components/ui/animated-tooltip";
import ImagesSlider from "../../components/ui/images-slider";
import { FloatingNav } from "../../components/ui/floating-navbar";

function Committees() {
  const params = useParams();
  const committee = params.name;
  const [clubs, setClubs] = useState([]);
  const [Cmember, setCmember] = useState([]);
  const [Images2, setImages2] = useState([]);
  const [Description, setDescription] = useState("description");
  const [GenSec, setGenSec] = useState("gensec");
  useEffect(() => {
    const fetchCommitteeDetails = async () => {
      try {
        const response = await axios.get(`/api/member/committee/${committee}`);
        const members = response.data.data;
        const committeDescription = await axios.get(
          `/api/committee/${committee}`
        );
        setDescription(committeDescription.data.data[0].description);
        setImages2(committeDescription.data.data[0].images);
        const members2 = members.filter(
          (member) => member.committeePost !== "General Secretory"
        );
        setCmember(members2);
        if (members !== null) {
          let genSec = members.filter(
            (member) => member.committeePost === "General Secretory"
          );
          setGenSec(genSec[0]);
        }
        const response2 = await axios.get(`/api/club/${committee}`);
        setClubs(response2.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCommitteeDetails();
  }, []);

  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Committees", link: "" },
    { name: "Notice", link: "/notice" },
    { name: "Fests", link: "/fests" },
    { name: "Events", link: "/events" },
    { name: "Blogs", link: "/blogs" },
    { name: "Alumnies", link: "/alumni" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen pt-[10vh] bg-black">
      <FloatingNav navItems={navItems} />
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-white to-gray-800 mt-8 mb-6 text-center tracking-widest drop-shadow-2xl font-jetbrains hover:scale-105 transition-transform duration-300 ease-in-out">
        {committee.toUpperCase()} COMMITTEE
      </h1>
      {Images2.length > 0 && (
        <ImagesSlider className="h-[40rem]" images={Images2}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center"
          >
            <motion.p className="font-bold text-xl md:text-3xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              {Description}
            </motion.p>
          </motion.div>
        </ImagesSlider>

      )}
      <div className="mt-10 w-full border-t border-gray-300 my-4"></div>
      <h3 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-white to-gray-800 mt-8 mb-6 text-center tracking-widest drop-shadow-2xl font-jetbrains hover:scale-105 transition-transform duration-300 ease-in-out">
        COMMITTEE MEMBERS
      </h3>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-4 border">
          <CardItem
            translateZ="50"
            className="text-lg font-bold text-neutral-600 dark:text-white mx-auto"
          >
            General Secretory
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 sm:text-xs max-w-xs mt-2 dark:text-neutral-300 px-8 text-2xl mx-auto"
          >
            {GenSec.name}
          </CardItem>

          <CardItem translateZ="50" className="w-full mt-4">
            <img
              src={`${GenSec.image}`}
              height="800"
              width="800"
              className="h-fit w-fit object-cover rounded-xl group-hover/card:shadow-xl mx-auto"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex flex-col items-center mt-10">
            <div className="flex space-x-4">
              <div
                translateZ={10}
                translateX={20}
                className="flex items-center justify-center"
              >
                <Link href={`${GenSec.linkedinId}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"></path>
                  </svg>
                </Link>
              </div>
              <div
                translateZ={10}
                translateX={20}
                className="flex items-center justify-center"
              >
                <a href={`${GenSec.instagram}`}>
                  <svg
                    fill="currentColor"
                    width="25"
                    height="25"
                    viewBox="0 0 19.2 19.2"
                    data-name="Instagram w/circle"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.498 6.651a1.656 1.656 0 0 0-.95-.949 2.766 2.766 0 0 0-.928-.172c-.527-.024-.685-.03-2.02-.03s-1.493.006-2.02.03a2.766 2.766 0 0 0-.929.172 1.656 1.656 0 0 0-.949.95 2.766 2.766 0 0 0-.172.928c-.024.527-.03.685-.03 2.02s.006 1.493.03 2.02a2.766 2.766 0 0 0 .172.929 1.656 1.656 0 0 0 .95.949 2.766 2.766 0 0 0 .928.172c.527.024.685.029 2.02.029s1.493-.005 2.02-.03a2.766 2.766 0 0 0 .929-.171 1.656 1.656 0 0 0 .949-.95 2.766 2.766 0 0 0 .172-.928c.024-.527.029-.685.029-2.02s-.005-1.493-.03-2.02a2.766 2.766 0 0 0-.171-.929zM9.6 12.168A2.568 2.568 0 1 1 12.168 9.6 2.568 2.568 0 0 1 9.6 12.168zm2.669-4.637a.6.6 0 1 1 .6-.6.6.6 0 0 1-.6.6zM11.267 9.6A1.667 1.667 0 1 1 9.6 7.933 1.667 1.667 0 0 1 11.267 9.6zM9.6 0a9.6 9.6 0 1 0 9.6 9.6A9.6 9.6 0 0 0 9.6 0zm4.97 11.661a3.67 3.67 0 0 1-.233 1.214 2.556 2.556 0 0 1-1.462 1.462 3.67 3.67 0 0 1-1.213.233c-.534.024-.704.03-2.062.03s-1.528-.006-2.062-.03a3.67 3.67 0 0 1-1.213-.233 2.556 2.556 0 0 1-1.462-1.462 3.67 3.67 0 0 1-.233-1.213c-.024-.534-.03-.704-.03-2.062s.006-1.528.03-2.062a3.67 3.67 0 0 1 .232-1.213 2.556 2.556 0 0 1 1.463-1.463 3.67 3.67 0 0 1 1.213-.232c.534-.024.704-.03 2.062-.03s1.528.006 2.062.03a3.67 3.67 0 0 1 1.213.232 2.556 2.556 0 0 1 1.462 1.463 3.67 3.67 0 0 1 .233 1.213c.024.534.03.704.03 2.062s-.006 1.528-.03 2.062z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </CardBody>
      </CardContainer>
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={Cmember} />
      </div>
      <div className="mt-10 w-full border-t border-gray-300 my-4"></div>

      <h3 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-white to-gray-800 mt-8 mb-6 text-center tracking-widest drop-shadow-2xl font-jetbrains hover:scale-105 transition-transform duration-300 ease-in-out">
        CLUBS
      </h3>
      <StickyScroll content={clubs} />
      <Footer />
    </div>
  );
}


export default Committees;

"use client";
import Image from "next/image";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { set } from "mongoose";

export const AnimatedTooltip2 = ({id}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 10 }; 
  const [item,setItem]=useState([]);
  const [change, setChange] = useState(false);
 
useEffect(()=>{
    const fetchClubMembers=async(item)=>{
        try{
            const response=await axios.get(`/api/member/get/${item}`);
            setItem(response.data.data);
        }
        catch(error){
            console.log(error.message);
        }
    }
    fetchClubMembers(id);   
},[change])
  const x = useMotionValue(0); 
  const rotate = useSpring(useTransform(x, [-100, 100], [-30, 30]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-40, 40]), springConfig);

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); 
  };

  return (
    <>
        {
          item!==null && 
          <div
          className="relative group mx-4" 
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item._id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item._id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 12, 
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.7 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-20 -left-1/2 translate-x-1/2 flex text-sm flex-col items-center justify-center rounded-lg bg-black z-50 shadow-xl px-6 py-3"
              >
                <div className="absolute inset-x-10 z-30 w-[25%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                <div className="font-bold text-white relative z-30 text-lg">
                  {item.name}
                </div>
                <div className="text-white text-sm">{item.committeePost}</div>
                <div className="text-white text-xs">
                <div className="flex space-x-4">
                         <a href={item.linkedinId}> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"></path>
              </svg></a>
            
              
            <a href={item.instagram}>
             <svg fill="currentColor" width="25" height="25" viewBox="0 0 19.2 19.2" data-name="Instagram w/circle" xmlns="http://www.w3.org/2000/svg"><path d="M13.498 6.651a1.656 1.656 0 0 0-.95-.949 2.766 2.766 0 0 0-.928-.172c-.527-.024-.685-.03-2.02-.03s-1.493.006-2.02.03a2.766 2.766 0 0 0-.929.172 1.656 1.656 0 0 0-.949.95 2.766 2.766 0 0 0-.172.928c-.024.527-.03.685-.03 2.02s.006 1.493.03 2.02a2.766 2.766 0 0 0 .172.929 1.656 1.656 0 0 0 .95.949 2.766 2.766 0 0 0 .928.172c.527.024.685.029 2.02.029s1.493-.005 2.02-.03a2.766 2.766 0 0 0 .929-.171 1.656 1.656 0 0 0 .949-.95 2.766 2.766 0 0 0 .172-.928c.024-.527.029-.685.029-2.02s-.005-1.493-.03-2.02a2.766 2.766 0 0 0-.171-.929zM9.6 12.168A2.568 2.568 0 1 1 12.168 9.6 2.568 2.568 0 0 1 9.6 12.168zm2.669-4.637a.6.6 0 1 1 .6-.6.6.6 0 0 1-.6.6zM11.267 9.6A1.667 1.667 0 1 1 9.6 7.933 1.667 1.667 0 0 1 11.267 9.6zM9.6 0a9.6 9.6 0 1 0 9.6 9.6A9.6 9.6 0 0 0 9.6 0zm4.97 11.661a3.67 3.67 0 0 1-.233 1.214 2.556 2.556 0 0 1-1.462 1.462 3.67 3.67 0 0 1-1.213.233c-.534.024-.704.03-2.062.03s-1.528-.006-2.062-.03a3.67 3.67 0 0 1-1.213-.233 2.556 2.556 0 0 1-1.462-1.462 3.67 3.67 0 0 1-.233-1.213c-.024-.534-.03-.704-.03-2.062s.006-1.528.03-2.062a3.67 3.67 0 0 1 .232-1.213 2.556 2.556 0 0 1 1.463-1.463 3.67 3.67 0 0 1 1.213-.232c.534-.024.704-.03 2.062-.03s1.528.006 2.062.03a3.67 3.67 0 0 1 1.213.232 2.556 2.556 0 0 1 1.462 1.463 3.67 3.67 0 0 1 .233 1.213c.024.534.03.704.03 2.062s-.006 1.528-.03 2.062z"/></svg>

             </a>
          </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={200} 
            width={200}  
            src={`${item.image}`}
            alt={item.name}
            className="object-cover object-top rounded-full h-30 w-30 border-4 group-hover:scale-110 group-hover:z-30 border-white transition duration-500 ease-in-out"
          />
        </div>
        } 
    </>
  );
};

"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-black dark:bg-neutral-950 font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-start pt-10 md:pt-40 md:gap-10">
            {/* Images and Text */}
            <div className="relative flex flex-col justify-center items-center md:items-end w-full md:w-3/4 md:pl-10">
              <div className="relative w-full md:w-[70%]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  style={{
                    maxWidth: "100%",
                    minWidth: "400px", // Adjust minimum width
                    marginLeft: "auto",
                  }}
                />
              </div>

              {/* Textbox Below Image */}
              <div className="mt-4 md:mt-6 text-center max-w-lg w-full md:ml-auto">
                <h3 className="text-lg md:text-2xl font-bold text-neutral-500 dark:text-neutral-300">{item.title}</h3>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">{item.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Timeline Line - Only Visible on Large Screens */}
        <div
          style={{
            height: height + "px",
          }}
          className="hidden lg:block absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

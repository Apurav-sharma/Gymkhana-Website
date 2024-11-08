"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);
  const [hovering, setHovering] = useState(false);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-center gap-4 [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-700 dark:bg-zinc-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative p-2 block text-white dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <FadeInDiv
        tabs={tabs}
        active={active}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({ className, tabs, hovering }) => {
  if (tabs.length === 0) return null;

  const isActive = (currentTab) => {
    const index = tabs.findIndex((tab) => tab.value === currentTab.value);
    const nextIndex = (index + 1) % 5;
    return tabs[nextIndex].value === currentTab.value;
  };

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: tabs.length - idx,
            opacity: idx < 3 ? 1 - idx * 0.3 : 0,
          }}
          animate={{
            y: isActive(tab) ? 10 : 0,
          }}
          className={cn("w-full h-[80vh] mt-[10vh] absolute left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};

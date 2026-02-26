"use client";

import { useState } from "react";
import Profile from "@/components/home/tabs/Profile";
import Projects from "@/components/home/tabs/Projects";
import TechAndTools from "@/components/home/tabs/TechAndTools";
import Contact from "@/components/home/tabs/Contact";

const TABS = ["Profile", "Projects", "Tech and Tools", "Contact"] as const;
type Tab = (typeof TABS)[number];

const TAB_CONTENT: Record<Tab, React.ReactNode> = {
  Profile: <Profile />,
  Projects: <Projects />,
  "Tech and Tools": <TechAndTools />,
  Contact: <Contact />,
};

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  return (
    <>
      <nav className="w-full bg-white sticky top-0 z-50 flex justify-center py-2.5 sm:py-3">
        {/* Mobile — horizontal scroll strip */}
        <div className="flex sm:hidden w-full overflow-x-auto scrollbar-none px-3 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 py-2 text-xs rounded-lg transition-all duration-200 whitespace-nowrap font-medium ${
                activeTab === tab
                  ? "bg-linear-to-r from-blue-600 via-red-400 to-yellow-300 text-gray-900 font-bold shadow-sm"
                  : "text-gray-400 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* sm+ — centered dark pill */}
        <div className="hidden sm:flex items-center bg-[#1c1c1e] rounded-xl p-1 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 md:px-5 py-2 text-xs md:text-sm rounded-lg transition-all duration-200 whitespace-nowrap font-medium ${
                activeTab === tab
                  ? "bg-linear-to-r from-blue-600 via-red-400 to-yellow-300 text-gray-900 font-bold shadow-sm"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab content */}
      <main className="w-full min-h-[60vh]">{TAB_CONTENT[activeTab]}</main>
    </>
  );
};

export default Navbar;

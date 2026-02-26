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
      <nav className="w-full bg-white sticky top-0 z-50 flex justify-center py-2.5 sm:py-3 px-3 sm:px-0 border-0 shadow-none outline-none">
        <div className="flex items-center bg-[#1c1c1e] rounded-xl p-1 gap-1 w-full sm:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 md:px-5 py-2 text-xs md:text-sm rounded-lg transition-all duration-200 whitespace-nowrap font-medium ${
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

      <main className="w-full min-h-[60vh]">{TAB_CONTENT[activeTab]}</main>
    </>
  );
};

export default Navbar;

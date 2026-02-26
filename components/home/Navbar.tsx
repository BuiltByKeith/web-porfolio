"use client";

import { useState } from "react";

const TABS = [
  "Profile",
  "Projects",
  "Skills",
  "Tech-n-Tools",
  "Contact",
] as const;

type Tab = (typeof TABS)[number];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  return (
    <nav className="w-full bg-white sticky top-0 z-50 flex justify-center py-3">
      {/* Scroll wrapper for mobile */}
      <div className="w-full px-4 overflow-x-auto scrollbar-hide">
        <div className="flex w-max mx-auto bg-[#1c1c1e] rounded-xl p-1 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 sm:px-5 py-2 text-sm rounded-lg transition-all duration-200 whitespace-nowrap font-medium ${
                activeTab === tab
                  ? "text-gray-900 font-bold shadow-sm bg-linear-to-r from-blue-600 via-red-400 to-yellow-300"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
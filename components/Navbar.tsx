"use client";

import { useState } from "react";

const TABS = [
  "Profile",
  "Projects",
  "Skills",
  "Tech and Tools",
  "Contact",
] as const;
type Tab = (typeof TABS)[number];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex items-center w-full">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 py-4 text-sm font-light tracking-wide transition-colors duration-200 whitespace-nowrap text-center ${
              activeTab === tab
                ? "text-black"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab}
            {/* Active underline */}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

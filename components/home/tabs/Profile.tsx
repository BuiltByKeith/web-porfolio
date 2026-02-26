const Profile = () => {
  const details = [
    { label: "Full Name", value: "Allen Keith A. Aradillos" },
    { label: "Location", value: "Tagum City, Philippines" },
    { label: "Age", value: "23" },
    { label: "Nationality", value: "Filipino" },
    { label: "Languages", value: "Visayan, Filipino, English" },
    { label: "Status", value: "Single and ready to mingle 😜" },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Central Mindanao University",
      year: "2020 – 2024",
      honor: "Cum Laude 🏅",
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left column */}
      <div className="flex flex-col gap-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-5 border border-gray-200 rounded-xl p-5">
          <div className="p-0.5 rounded-full bg-linear-to-r from-blue-500 via-red-400 to-yellow-300 shrink-0">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/images/avatar.png"
                alt="Keith"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">BuiltByKeith</h2>
            <p className="text-sm text-gray-500 font-light">Web Developer</p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-600 hover:underline"
              >
                GitHub
              </a>
              <a
                href="mailto:you@email.com"
                className="text-xs text-gray-600 hover:underline"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-red-500 to-yellow-500 mb-4 tracking-wide uppercase">
            Personal Details
          </h3>
          <ul className="flex flex-col gap-3">
            {details.map(({ label, value }) => (
              <li key={label} className="flex justify-between text-sm">
                <span className="text-gray-400 font-light">{label}</span>
                <span className="text-gray-800 font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-4">
        {/* About / Bio */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-red-500 to-yellow-500 mb-3 tracking-wide uppercase">
            About Me
          </h3>
          <p className="text-sm text-gray-800 font-light leading-relaxed">
            I'm a web developer who enjoys building clean, functional, and
            well-designed digital experiences. I focus on writing code that's
            maintainable, performant, and — usually — works on the first try. 🍀
          </p>
        </div>

        {/* Education */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-red-500 to-yellow-500 mb-4 tracking-wide uppercase">
            Educational Background
          </h3>
          {education.map((edu, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-800">
                {edu.degree}
              </p>
              <p className="text-sm text-gray-500">{edu.school}</p>
              <div className="flex gap-3 mt-1">
                <span className="text-xs text-gray-400">{edu.year}</span>
                {edu.honor && (
                  <span className="text-xs text-emerald-600 font-medium">
                    <a
                      href="https://search.brave.com/search?q=what+is+cum+laude"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {edu.honor}
                    </a>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resume */}
        <a
          href="/files/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3"
            />
          </svg>
          Download Resume / CV
        </a>
      </div>
    </section>
  );
};

export default Profile;

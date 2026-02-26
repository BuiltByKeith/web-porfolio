const Footer = () => {
  const links = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/allen-keith-aradillos-865866368/",
    },
    { label: "GitHub", href: "https://github.com/BuiltByKeith" },
    { label: "Email", href: "mailto:builtbykeith.dev@gmail.com" },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/6">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left — name / brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-m font-semibold text-white/80">
            BuiltByKeith
          </span>
          <span className="text-xs text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-red-500 to-yellow-500 font-light">
            Web Developer
          </span>
        </div>

        {/* Center — copyright */}
        <p className="text-xs text-white/70 font-light tracking-wide order-last sm:order-0">
          © {new Date().getFullYear()} Keith. All rights reserved.
        </p>

        {/* Right — social links */}
        <div className="flex items-center gap-5">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/70 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

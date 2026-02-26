const projects = [
  {
    title: "ProcureNet",
    description:
      "A comprehensive budget and procurement system built with Laravel Framework with MySQL database. Features auth, real-time updates, and a responsive dashboard.",
    tags: ["Laravel", "MySQL", "HTML", "CSS", "JS/AJAX"],
    live: "http://apps.cmu.edu.ph/cmu-bac",
    repo: "/https://github.com/BuiltByKeith",
    image: "/images/projects/bac.png",
  },
  {
    title: "Boarding House and Dormitory Management System",
    description:
      "A comprehensive housing management system with mapping. Built with Laravel Framework, MySQL Database and deployed on a dockerized environment.",
    tags: ["Laravel", "MySQL", "HTML", "CSS", "JS/AJAX"],
    live: "http://apps.cmu.edu.ph/bdms",
    repo: "https://github.com/BuiltByKeith",
    image: "/images/projects/bdms.png",
  },
  {
    title: "Student Organization Management System",
    description:
      "A comprehensive student organization management system with built with Laravel Framework and MySQL Database.",
    tags: ["Laravel", "MySQL", "HTML", "CSS", "JS/AJAX"],
    live: "http://apps.cmu.edu.ph/osa",
    repo: "https://github.com/BuiltByKeith",
    image: "/images/projects/osa.png",
  },
  {
    title: "Aguaboo Operations Management System",
    description:
      "A comprehensive business operations management system for Aguaboo Waters built with Laravel Framework and MySQL Database.",
    tags: ["Laravel", "MySQL", "HTML", "CSS", "JS/AJAX"],
    live: "https://aguaboo.com/",
    repo: "https://github.com/BuiltByKeith",
    image: "/images/projects/aguaboo.png",
  },
  {
    title: "QuantumHive Innovations Website",
    description:
      "A website designed for QuantumHive Innovations built with HTML, CSS, Javascript, and some external frontend libraries.",
    tags: ["HTML", "CSS", "Javascript", "Bootstrap", "PHP"],
    live: "https://qhive-innovations.com/",
    repo: "https://github.com/BuiltByKeith",
    image: "/images/projects/qhive.png",
  },
  {
    title: "Software Development Department Website",
    description:
      "A website designed for the Software Development Department of CMU built with HTML, CSS, Javascript, and some external frontend libraries.",
    tags: ["HTML", "CSS", "Javascript", "Bootstrap", "PHP"],
    live: "http://apps.cmu.edu.ph/",
    repo: "https://github.com/BuiltByKeith",
    image: "/images/projects/sdd.png",
  },
  {
    title: "ZMML Website",
    description:
      "A website designed for ZMML built and hardcoded only with HTML, CSS, Javascript.",
    tags: ["HTML", "CSS", "Javascript", "Bootstrap", "PHP"],
    live: "https://qhive-innovations.com/zmml_website",
    repo: "https://github.com/BuiltByKeith",
    image: "/images/projects/zmml.png",
  },
  {
    title: "And many more sooon...",
    description: "Let him cook!",
    tags: ["React", "NodeJS", "Express", "Supabase"],
    live: "/",
    repo: "https://github.com/BuiltByKeith",
    image: "/images/projects/lethimcook.png",
  },
];

const Projects = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-10">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Project image */}
            <div className="w-full h-40 bg-gray-100 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
              <h3 className="text-sm font-semibold text-gray-800">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-1">
                {project.live !== "/" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-blue-500 hover:underline"
                  >
                    Live →
                  </a>
                )}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-gray-400 hover:underline"
                >
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

const toolGroups = [
  {
    category: "Languages",
    tools: ["JavaScript", "TypeScript", "HTML5", "CSS", "PHP", "Python"],
  },
  {
    category: "Frameworks & Libraries",
    tools: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Laravel",
    ],
  },
  {
    category: "Databases",
    tools: ["PostgreSQL", "MySQL", "Supabase", "Firebase"],
  },
  {
    category: "Dev Tools",
    tools: ["Git", "GitHub", "VS Code", "Postman"],
  },
  {
    category: "Deployment & Infra",
    tools: ["Vercel", "Docker", "Linux", "Hostinger"],
  },
  {
    category: "Currently Learning/Improving",
    tools: ["React", "TypeScript", "NodeJS ORMs", "React Native"],
  },
];

// Simple colored badge per category
const categoryColors: Record<string, string> = {
  Languages: "bg-blue-50 text-blue-600 border-blue-100",
  "Frameworks & Libraries": "bg-purple-50 text-purple-600 border-purple-100",
  Databases: "bg-green-50 text-green-600 border-green-100",
  "Dev Tools": "bg-orange-50 text-orange-600 border-orange-100",
  "Deployment & Infra": "bg-yellow-50 text-yellow-600 border-yellow-100",
  "Currently Learning/Improving": "bg-red-50 text-red-600 border-red-100",
};

const TechAndTools = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-10">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Tech & Tools</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {toolGroups.map((group) => (
          <div
            key={group.category}
            className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3"
          >
            <h3 className="text-xs font-semibold text-gray-600  uppercase tracking-widest">
              {group.category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <span
                  key={tool}
                  className={`text-xs px-3 py-1 rounded-full border font-medium ${
                    categoryColors[group.category] ??
                    "bg-gray-50 text-gray-600 border-gray-100"
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechAndTools;

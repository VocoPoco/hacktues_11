// pages/ProjectsList.jsx
import React from "react";
import Navbar from "../../components/Navbar/navbar";

const ProjectsList = () => {
  const projects = [
    { name: "Project Alpha", date: "2024-03-15", subtopics: 9 },
    { name: "Project Beta", date: "2024-03-14", subtopics: 5 },
    { name: "Project Gamma", date: "2024-03-13", subtopics: 7 },
  ];

  return (
    <div className="pt-16 min-h-screen bg-[#fffbf9]">
      <Navbar />
      
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#232323]">My Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-[#232323]">{project.name}</h3>
                <span className="text-[#616062] text-sm">{project.date}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(project.subtopics)].map((_, i) => (
                  <span key={i} className="px-3 py-1 bg-[#8c281f]/10 text-[#8c281f] rounded-full text-sm">
                    Subtopic {i+1}
                  </span>
                ))}
              </div>
              <button className="text-[#8c281f] hover:text-[#732018] transition-colors">
                More for project →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
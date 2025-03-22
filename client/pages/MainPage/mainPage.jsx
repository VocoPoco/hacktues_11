import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar.jsx";

const UserHomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/profile/projects?username=" + username
        ); // Replace with actual API
        if (response.status !== 200)
          throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Project Card Component
  const ProjectCard = ({ project }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#fffbf9] hover:border-[#616062]/10">
      <p className="text-[#8c281f] text-sm mb-2 font-light">
        {new Date(project.created_at).toLocaleDateString()} |{" "}
        {project.time_period}
      </p>
      <h2 className="text-2xl text-[#232323] mb-4 font-normal">
        {project.name}
      </h2>
      <p className="text-lg text-gray-700 mb-4">💰 Budget: ${project.budget}</p>
      <ul className="mb-6">
        {project.subtask_titles.map((sub, index) => (
          <li key={index} className="text-[#616062] mb-2 flex items-center">
            <span className="text-[#8c281f] mr-2">●</span>
            {sub}
          </li>
        ))}
      </ul>
      <button 
  onClick={() => {
    if (project.id) {
      navigate(`/projects/${project.id}`);
    } else {
      console.error("Error: Project ID is undefined", project);
    }
  }}
  className="text-[#8c281f] hover:text-[#762119] font-medium transition-colors"
>
  Explore Project →
</button>

    </div>
  );

  return (
    <main className="min-h-screen bg-[#fffbf9]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Header */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-normal text-[#232323] mb-2">
            Welcome, {username}
          </h1>
          <p className="text-[#616062]">Curated Excellence in Progress</p>
        </div>

        {/* Primary Action */}
        <div className="text-center mb-20">
          <button
            onClick={() => navigate("/create-project")}
            className="bg-[#8c281f] text-[#fffbf9] px-14 py-4 rounded-lg text-lg 
              hover:bg-[#762119] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Initiate New Venture
          </button>
        </div>

        {/* Project Grid */}
        <section className="mb-20">
          {loading ? (
            <p className="text-center text-gray-500 text-lg">
              Loading projects...
            </p>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects available.</p>
          )}
          <div className="text-center">
            <button
              onClick={() => navigate("/projects")}
              className="border-2 border-[#8c281f] text-[#8c281f] px-8 py-3 rounded-lg
                hover:bg-[#8c281f]/5 transition-colors duration-200"
            >
              View All
            </button>
          </div>
        </section>

        {/* Collaborative Section */}
        <section className="text-center py-16 border-t border-[#616062]/10">
          <h3 className="text-xl text-[#232323] mb-8">
            Strategic Partnerships
          </h3>
          <div className="flex justify-center gap-6 mb-12">
            {["JD", "AM", "TS"].map((initials) => (
              <div
                key={initials}
                className="w-16 h-16 bg-[#8c281f] rounded-full flex items-center justify-center 
                  text-[#fffbf9] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-[#616062] max-w-2xl mx-auto">
            Connect with our network of elite specialists to elevate your
            project to its maximum potential through strategic collaboration.
          </p>
        </section>
      </div>
    </main>
  );
};

export default UserHomePage;

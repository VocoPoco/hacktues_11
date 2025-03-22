import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/footer";

const UserHomePage = ({ username }) => {
  const navigate = useNavigate();
  
  const projects = [
    { 
      name: "Luxury Villa Concept", 
      date: "2024 Q3 Release", 
      subtopics: ["Architecture", "Interior Design", "Landscaping", "Material Selection"] 
    },
    { 
      name: "Premium Fashion Line", 
      date: "Fall Collection 2024", 
      subtopics: ["Fabric Sourcing", "Pattern Design", "Brand Strategy", "Retail Partners"] 
    },
    { 
      name: "Executive Conference", 
      date: "March 2024", 
      subtopics: ["Keynote Speakers", "Venue Design", "VIP Experiences", "Media Coverage"] 
    },
  ];

  const ProjectCard = ({ project }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#fffbf9] hover:border-[#616062]/10">
      <p className="text-[#8c281f] text-sm mb-2 font-light">{project.date}</p>
      <h2 className="text-2xl text-[#232323] mb-4 font-normal">{project.name}</h2>
      <ul className="mb-6">
        {project.subtopics.map((sub, index) => (
          <li key={index} className="text-[#616062] mb-2 flex items-center">
            <span className="text-[#8c281f] mr-2">●</span>{sub}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => navigate(`/projects/${project.name.toLowerCase().replace(/ /g, '-')}`)}
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
            className="bg-[#8c281f] text-[#fffbf9] px-14 py-4 rounded-lg
              text-lg hover:bg-[#762119] transition-colors duration-200
              shadow-lg hover:shadow-xl"
          >
            Initiate New Venture
          </button>
        </div>

        {/* Project Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          <div className="text-center">
            <button
              className="border-2 border-[#8c281f] text-[#8c281f] px-8 py-3 rounded-lg
                hover:bg-[#8c281f]/5 transition-colors duration-200"
            >
              View Archive
            </button>
          </div>
        </section>

        {/* Collaborative Section */}
        <section className="text-center py-16 border-t border-[#616062]/10">
          <h3 className="text-xl text-[#232323] mb-8">Strategic Partnerships</h3>
          <div className="flex justify-center gap-6 mb-12">
            {['JD', 'AM', 'TS'].map((initials) => (
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
            Connect with our network of elite specialists to elevate your project to 
            its maximum potential through strategic collaboration.
          </p>
        </section>
      </div>

      {/* <Footer className="bg-[#232323] text-[#fffbf9]" /> */}
    </main>
  );
};

export default UserHomePage;
// pages/ProjectDetail.jsx
import React from "react";
import Navbar from "../../components/Navbar/navbar";

const ProjectDetail = () => {
  return (
    <div className="pt-16 min-h-screen bg-[#fffbf9]">
      <Navbar />
      
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-[#232323]"># Project name</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#232323]">Project Details</h2>
              <p className="text-[#616062]">Jane Smith</p>
              <p className="text-[#616062]">jane@framer.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#232323]">Configuration</h2>
              <p className="text-[#616062]">Category: Development</p>
              <p className="text-[#616062]">Tags: Web, SaaS, Platform</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#232323]">Description</h2>
            <p className="text-[#616062]">Your message...</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#232323]">{item.toString().padStart(2, '0')} Heading</h3>
                <button className="text-[#8c281f] hover:text-[#732018] transition-colors">
                  Change variant
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-[#616062]">
                Layout Layout Layout
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
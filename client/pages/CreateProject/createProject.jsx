import React from "react";

const CreateProject = () => {
  return (
    <div className="pt-16 min-h-screen bg-[#fffbf9]">
      
      <div className="container mx-auto p-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-[#232323]">Bring Your Project to Life</h1>
        <p className="text-[#616062] mb-6">
          Provide the key details about your project, and let us help you find the perfect talent to bring your vision in   to reality.
        </p>

        <form className="space-y-6">

          <div>
            <label className="block font-bold text-[#616062] mb-2">Project Title</label>
            <input
              type="text"
              placeholder="Give your project a standout name"
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#616062] mb-2">Project Overview</label>
            <textarea
              rows="7"
              placeholder="Describe your project in detail—what it’s about, what you need, and any key expectations."
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#616062] mb-2">Estimated Budget ($)</label>
            <input
              type="number"
              placeholder="Enter your budget (e.g., 500.00)"
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#616062] mb-2">Expected Timeline</label>
            <input
              type="text"
              placeholder="How long do you expect this project to take? (e.g., 10 days, 2 weeks, 1 month)"
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <button className="w-full bg-[#8c281f] text-white py-3 rounded-lg hover:bg-[#732018] transition-colors">
            Post Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;

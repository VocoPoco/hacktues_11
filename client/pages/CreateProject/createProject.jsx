// pages/CreateProject.jsx
import React from "react";

const CreateProject = () => {
  return (
    <div className="pt-16 min-h-screen bg-[#fffbf9]">
      
      <div className="container mx-auto p-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-[#232323]">Create your project</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block text-[#616062] mb-2">How many topics do you prefer?</label>
            <input
              type="number"
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block text-[#616062] mb-2">Email</label>
            <input
              type="email"
              defaultValue="Jan@framer.com"
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block text-[#616062] mb-2">Your message...</label>
            <textarea
              rows="4"
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <button className="w-full bg-[#8c281f] text-white py-3 rounded-lg hover:bg-[#732018] transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/profile/create-project", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: title,
          description: overview,
          budget: parseFloat(budget),
          time_period: timeline,
          username,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to create project");
      }

      navigate("/all-projects");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-[#fffbf9]">
      <div className="container mx-auto p-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-[#232323]">
          Bring Your Project to Life
        </h1>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-bold text-[#616062] mb-2">Project Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#616062] mb-2">Project Overview</label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={7}
              required
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#616062] mb-2">Estimated Budget ($)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#616062] mb-2">Expected Timeline</label>
            <input
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              required
              className="w-full p-3 border border-[#616062]/30 rounded-lg focus:ring-2 focus:ring-[#8c281f]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#8c281f] hover:bg-[#732018]"
            } text-white py-3 rounded-lg transition-colors`}
          >
            {loading ? "Posting…" : "Post Project"}
          </button>
        </form>
      </div>
    </div>
  );
}

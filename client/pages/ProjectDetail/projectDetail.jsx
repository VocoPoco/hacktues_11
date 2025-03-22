import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "guest";
  const [project, setProject] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId || projectId === "undefined") {
      console.error("Error: Invalid projectId", projectId);
      navigate("/all-projects");  // Redirect user if projectId is invalid
      return;
    }

    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile/projects/${projectId}?username=${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch project details");

        const data = await response.json();

        setProject(data.project || {});
        setSubtasks(data.subtasks || []);

      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId, username, navigate]);

  if (loading) return <p className="text-center text-gray-500">Loading project details...</p>;
  if (!project) return <p className="text-center text-gray-500">Project not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Project Info */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight border-b border-gray-200 pb-4 mb-6">
          {project.name}
        </h1>
        <p className="text-lg text-gray-700 leading-7 mb-8">{project.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center text-lg">
              <span className="w-8 text-blue-600">💰</span>
              <span className="text-gray-600">Budget:</span>
              <span className="ml-2 font-semibold text-gray-900">${project.budget}</span>
            </div>
            <div className="flex items-center text-lg">
              <span className="w-8 text-purple-600">⏳</span>
              <span className="text-gray-600">Duration:</span>
              <span className="ml-2 font-semibold text-gray-900">{project.time_period}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm italic self-center">
            📅 Created {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Subtasks Section */}
      <div className="space-y-10">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
          Subtasks
        </h2>
        
        {subtasks.length > 0 ? (
          subtasks.map((subtask) => (
            <div key={subtask.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{subtask.title}</h3>
                <p className="text-gray-600 leading-6">{subtask.description}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Freelancers</h4>
                {subtask.freelancers.length > 0 ? (
                  <ul className="space-y-4">
                    {subtask.freelancers.map((freelancer) => (
                      <li key={freelancer.id} className="p-6 bg-gray-50 rounded-lg transition-all hover:bg-white">
                        <a href={freelancer.profile_url} target="_blank" rel="noopener noreferrer" 
                           className="group block">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-lg font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                              {freelancer.screen_name}
                            </h5>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                              ⭐ {freelancer.total_score}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{freelancer.service_title}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>💵 ${freelancer.service_rates.hourly}/hr</span>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {freelancer.skills.map((skill, index) => (
                              <span key={index} 
                                    className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg">
                    <p className="text-gray-400 italic">No freelancers assigned yet</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-400 italic">No subtasks available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

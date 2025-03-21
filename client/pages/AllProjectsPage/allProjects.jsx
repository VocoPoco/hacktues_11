import React from "react";
import "./allProjectsPage.css";
import Navbar from "../../components/Navbar/navbar.jsx";

const projects = [
  { name: "Project name", date: "date", subtopics: ["Subtopic", "Subtopic", "Subtopic", "Subtopic"] },
  { name: "Project name", date: "date", subtopics: ["Subtopic", "Subtopic", "Subtopic", "Subtopic"] },
  { name: "Project name", date: "date", subtopics: ["Subtopic", "Subtopic", "Subtopic", "Subtopic"] },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <p className="project-date">{project.date}</p>
      <h2 className="project-title">{project.name}</h2>
      <ul className="subtopics">
        {project.subtopics.map((sub, index) => (
          <li key={index} className="subtopic-item">◉ {sub}</li>
        ))}
      </ul>
      <button className="project-button">More for project</button>
    </div>
  );
};

const ProjectGrid = () => {
  return (
    <div className="projects-container">  {/* Changed here */}
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <button className="more-button">More</button>
    </div>
  );
};

export default function ProjectList() {
  return (
    <div>
      <Navbar scrollProgress={1} />
      <ProjectGrid />
    </div>
  );
}



import React from "react";

const freelancers = [
  { name: "John Doe", rating: "4.9", description: "Web Developer" },
  { name: "Jane Smith", rating: "4.8", description: "UI/UX Designer" },
  { name: "Alice Johnson", rating: "5.0", description: "Backend Developer" },
  { name: "Robert Brown", rating: "4.7", description: "Full Stack Developer" },
  { name: "Emily Davis", rating: "4.9", description: "Mobile App Developer" },
];

const ServicePage = () => {
  return (
    <div className="service-page">
      <div className="freelancer-list">
        {freelancers.map((freelancer, index) => (
          <div key={index} className="freelancer-card">
            <div className="freelancer-card-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="freelancer-card-content">
              <h3>{freelancer.name}</h3>
              <p>{freelancer.description}</p>
              <div className="rating">
                <span>Rating: {freelancer.rating}</span>
              </div>
              <button className="read-more-button">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;

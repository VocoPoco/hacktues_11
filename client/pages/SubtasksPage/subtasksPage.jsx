import "./subtasks.css";
import { useState } from 'react';

export default function ProjectPage() {
  const sections = [1, 2, 3, 4];
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [confirmedFreelancer, setConfirmedFreelancer] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const freelancers = [
    {
    avatar_img_url: 'https://res.cloudinary.com/gurucom/image/upload/w_96,h_96,f_auto,dpr_2/pimg/2/178/2178498/Scarlet%20Star_636363191916843130_guruImgLarge_49d91f6d-2e51-46dc-ba34-cec17ab65eeb.jpg',
    screen_name: 'Top Guru Assistants',
    city: 'Laguna Beach',
    state: 'California',
    country: 'United States',
    earnings: '263,995',
    feedback: '100%',
    service_title: 'Figma to WordPress',
    service_rates: { rate_per_hour: '24$', starting_rate: '500$' },
    service_desc: 'YES IT Labs LLC dba Top Guru Assistants is full-stack IT services and solutions providing company, headquartered in California, USA...',
    skills: ['Adobe Photoshop', 'AI to WordPress', 'E Commerce', 'Programming & Development'],
    total_score: 79201.0,
    profile_url: 'https://www.guru.com/freelancers/top-guru-assistants' // Example profile link
  },
  {
     avatar_img_url: 'https://res.cloudinary.com/gurucom/image/upload/w_96,h_96,f_auto,dpr_2/pimg/3/245/3124591/PixelCraft_Studio_123456789_guruImgLarge.jpg',
screen_name: 'PixelCraft Studios',
city: 'Austin',
state: 'Texas',
country: 'United States',
earnings: '198,750',
feedback: '98%',
service_title: 'Custom WordPress Development',
service_rates: { rate_per_hour: '30$', starting_rate: '700$' },
service_desc: 'PixelCraft Studios is a leading web development agency specializing in custom WordPress solutions, UI/UX, and eCommerce development...',
skills: ['Figma to HTML', 'Custom WordPress Themes', 'Shopify', 'Web Development'],
total_score: 68425.0,
profile_url: 'https://www.guru.com/freelancers/pixelcraft-studios'
  },  {
    avatar_img_url: 'https://res.cloudinary.com/gurucom/image/upload/w_96,h_96,f_auto,dpr_2/pimg/4/318/4218586/CodeCrafters_Agency_guruImgLarge.jpg',
screen_name: 'CodeCrafters Agency',
city: 'San Francisco',
state: 'California',
country: 'United States',
earnings: '325,400',
feedback: '99%',
service_title: 'AI-Powered Web Development',
service_rates: { rate_per_hour: '35$', starting_rate: '1000$' },
service_desc: 'CodeCrafters Agency builds innovative, AI-driven websites and applications tailored to modern business needs...',
skills: ['AI Integrations', 'Web Scraping', 'React.js', 'Python & Django'],
total_score: 84510.0,
profile_url: 'https://www.guru.com/freelancers/codecrafters-agency'
  },
  {
    avatar_img_url: 'https://res.cloudinary.com/gurucom/image/upload/w_96,h_96,f_auto,dpr_2/pimg/5/402/5219856/DevMasters_Hub_guruImgLarge.jpg',
screen_name: 'DevMasters Hub',
city: 'Miami',
state: 'Florida',
country: 'United States',
earnings: '156,300',
feedback: '97%',
service_title: 'E-Commerce & WooCommerce Expert',
service_rates: { rate_per_hour: '28$', starting_rate: '600$' },
service_desc: 'DevMasters Hub is a team of expert developers focused on creating high-performing WooCommerce and Shopify stores...',
skills: ['WooCommerce', 'Shopify', 'PHP Development', 'SEO Optimization'],
total_score: 62350.0,
profile_url: 'https://www.guru.com/freelancers/devmasters-hub'
  },
  ];

   const handleCardClick = (freelancer) => {
    if (!confirmedFreelancer) {
      setSelectedFreelancer(freelancer);
    }
  };

  const confirmSelection = () => {
    setConfirmedFreelancer(selectedFreelancer);
    setShowConfirmation(false);
  };

  const closeModal = () => {
    setShowConfirmation(false);
    setSelectedFreelancer(null);
  };

  return (
    <div className="project-container">
      <h1 className="project-title">Project name</h1>

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Selection</h3>
            <div className="modal-body">
              <h4>{selectedFreelancer?.screen_name}</h4>
              <p>{selectedFreelancer?.service_desc}</p>
              <div className="modal-skills">
                {selectedFreelancer?.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={closeModal}>Cancel</button>
              <button className="modal-confirm" onClick={confirmSelection}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="sections-grid">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`section-wrapper ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="section-content">
              <div className="section-number">{section.toString().padStart(2, "0")}</div>

              <div className="section-card">
                <div className="section-header">
                  <span className="section-tagline">Phase {section}</span>
                  <h2 className="section-heading">Design Implementation</h2>
                </div>

                <div className="cards-grid">
                  {freelancers.map((freelancer, index) => (
                    <div
                      key={index}
                      className={`card
                        ${selectedFreelancer?.profile_url === freelancer.profile_url ? 'selected' : ''}
                        ${confirmedFreelancer?.profile_url === freelancer.profile_url ? 'confirmed' : ''}`}
                      onClick={() => handleCardClick(freelancer)}
                    >
                      <div className="card-header">
                        <div className="star-icon">⭐</div>
                        <h2 className="card-title">{freelancer.service_title}</h2>
                      </div>
                      <p className="card-earnings">
                        Last Year’s Earnings: <strong>{freelancer.earnings}</strong>
                      </p>
                      <p className="card-feedback">
                        Feedback: <strong className="feedback-score">{freelancer.feedback}</strong>
                      </p>
                      <p className="card-rate">
                        {freelancer.service_rates.rate_per_hour} • From {freelancer.service_rates.starting_rate}
                      </p>
                      {!confirmedFreelancer && (
                        <div className="card-overlay">
                          <div className="overlay-content">
                            <p className="text-sm leading-relaxed">
                              {freelancer.service_desc}
                            </p>
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold">Skills</h4>
                              <div className="skills-container">
                                {freelancer.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="skill-tag"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="section-actions">
                  <button
                    className={`action-button
                      ${confirmedFreelancer ? 'confirmed' : ''}
                      ${selectedFreelancer && !confirmedFreelancer ? 'active' : 'disabled'}`}
                    onClick={() => setShowConfirmation(true)}
                    disabled={!selectedFreelancer || confirmedFreelancer}
                  >
                    {confirmedFreelancer ? "Selection Confirmed" : "Select Variant"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
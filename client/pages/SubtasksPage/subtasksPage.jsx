import "./subtasks.css";
import { useState } from "react";

export default function ProjectPage() {
  const sections = [1, 2, 3, 4];
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [confirmedFreelancer, setConfirmedFreelancer] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const freelancers = [
    {
      avatar_img_url:
        "https://res.cloudinary.com/gurucom/image/upload/w_96,h_96,f_auto,dpr_2/pimg/2/178/2178498/Scarlet%20Star_636363191916843130_guruImgLarge_49d91f6d-2e51-46dc-ba34-cec17ab65eeb.jpg",
      screen_name: "Top Guru Assistants",
      city: "Laguna Beach",
      state: "California",
      country: "United States",
      earnings: "263,995",
      feedback: "100%",
      service_title: "Figma to WordPress",
      service_rates: { rate_per_hour: "24$", starting_rate: "500$" },
      service_desc:
        "YES IT Labs LLC dba Top Guru Assistants is full-stack IT services and solutions providing company, headquartered in California, USA...",
      skills: [
        "Adobe Photoshop",
        "AI to WordPress",
        "E Commerce",
        "Programming & Development",
      ],
      total_score: 79201.0,
      profile_url: "https://www.guru.com/freelancers/top-guru-assistants", // Example profile link
    },
    {
      avatar_img_url:
        "https://res.cloudinary.com/gurucom/image/upload/w_96,h_96,f_auto,dpr_2/pimg/3/245/3124591/PixelCraft_Studio_123456789_guruImgLarge.jpg",
      screen_name: "PixelCraft Studios",
      city: "Austin",
      state: "Texas",
      country: "United States",
      earnings: "198,750",
      feedback: "98%",
      service_title: "Custom WordPress Development",
      service_rates: { rate_per_hour: "30$", starting_rate: "700$" },
      service_desc:
        "PixelCraft Studios is a leading web development agency specializing in custom WordPress solutions, UI/UX, and eCommerce development...",
      skills: [
        "Figma to HTML",
        "Custom WordPress Themes",
        "Shopify",
        "Web Development",
      ],
      total_score: 68425.0,
      profile_url: "https://www.guru.com/freelancers/pixelcraft-studios",
    },
    {
      avatar_img_url:
        "https://res.cloudinary.com/gurucom/image/upload/w_96,h_96,f_auto,dpr_2/pimg/4/318/4218586/CodeCrafters_Agency_guruImgLarge.jpg",
      screen_name: "CodeCrafters Agency",
      city: "San Francisco",
      state: "California",
      country: "United States",
      earnings: "325,400",
      feedback: "99%",
      service_title: "AI-Powered Web Development",
      service_rates: { rate_per_hour: "35$", starting_rate: "1000$" },
      service_desc:
        "CodeCrafters Agency builds innovative, AI-driven websites and applications tailored to modern business needs...",
      skills: [
        "AI Integrations",
        "Web Scraping",
        "React.js",
        "Python & Django",
      ],
      total_score: 84510.0,
      profile_url: "https://www.guru.com/freelancers/codecrafters-agency",
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
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">
        Project name
      </h1>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Selection
            </h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-red-800 mb-2">
                {selectedFreelancer?.screen_name}
              </h4>
              <p className="text-gray-600 mb-4">
                {selectedFreelancer?.service_desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedFreelancer?.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
                onClick={confirmSelection}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-16">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`flex justify-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
          >
            <div className="flex items-center gap-8 w-full md:w-4/5 max-w-6xl md:flex-row flex-col">
              <div className="text-6xl font-bold text-red-800 text-center md:text-left">
                {section.toString().padStart(2, "0")}
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 w-full">
                <div className="mb-8">
                  <span className="text-sm uppercase text-gray-500 tracking-wide">
                    Phase {section}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    Design Implementation
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                  {freelancers.map((freelancer, index) => (
                    <div
                      key={index}
                      className={`relative rounded-xl p-6 shadow-md transition-transform cursor-pointer border-2 ${
                        selectedFreelancer?.profile_url ===
                        freelancer.profile_url
                          ? "border-red-800 scale-[1.02]"
                          : "border-transparent"
                      } ${
                        confirmedFreelancer?.profile_url ===
                        freelancer.profile_url
                          ? "border-green-500"
                          : ""
                      } hover:scale-105`}
                      onClick={() => handleCardClick(freelancer)}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">⭐</span>
                        <h2 className="text-xl font-bold text-gray-800">
                          {freelancer.service_title}
                        </h2>
                      </div>
                      <p className="text-gray-600 mb-2">
                        Last Year’s Earnings:{" "}
                        <strong className="font-semibold">
                          {freelancer.earnings}
                        </strong>
                      </p>
                      <p className="text-gray-600 mb-2">
                        Feedback:{" "}
                        <strong className="text-green-600 font-semibold">
                          {freelancer.feedback}
                        </strong>
                      </p>
                      <p className="text-gray-600 font-medium">
                        {freelancer.service_rates.rate_per_hour} • From{" "}
                        {freelancer.service_rates.starting_rate}
                      </p>

                      {!confirmedFreelancer && (
                        <div className="absolute inset-0 bg-red-900/90 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl p-4">
                          <div className="text-white text-center transform transition-transform">
                            <p className="text-sm mb-4">
                              {freelancer.service_desc}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {freelancer.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      confirmedFreelancer
                        ? "bg-green-600 text-white cursor-default"
                        : selectedFreelancer && !confirmedFreelancer
                          ? "bg-red-800 hover:bg-red-900 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={() => setShowConfirmation(true)}
                    disabled={!selectedFreelancer || confirmedFreelancer}
                  >
                    {confirmedFreelancer
                      ? "Selection Confirmed"
                      : "Select Variant"}
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

import React, { useState, useEffect } from "react";

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
  },  {
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
  },  {
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
  // Add more freelancer objects as needed
];

const Freelancers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Using static array for now
    setData(freelancers);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {data.map((freelancer, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => window.open(freelancer.profile_url, "_blank")}
          >
            {/* Main Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={freelancer.avatar_img_url}
                  alt={`${freelancer.screen_name} avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{freelancer.screen_name}</h3>
                  <p className="text-sm text-gray-500">
                    {freelancer.city}, {freelancer.state}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Last Year's Earnings</p>
                  <p className="font-semibold">${freelancer.earnings}</p>
                </div>
                <div>
                  <p className="text-gray-500">Feedback</p>
                  <p className="font-semibold text-green-600">{freelancer.feedback}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">{freelancer.service_title}</h4>
                <div className="flex gap-2 mt-1 text-sm">
                  <span className="text-primary-600 font-medium">
                    {freelancer.service_rates.rate_per_hour}/hr
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    From {freelancer.service_rates.starting_rate}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {freelancer.service_desc}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Score</span>
                  <span className="font-semibold text-primary-600">
                    {freelancer.total_score.toLocaleString()}
                  </span>
                </div>
                <button
                  className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    window.open(freelancer.profile_url, "_blank");
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelancers;

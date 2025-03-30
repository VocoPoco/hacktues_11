import { useState } from 'react';

const SpecialistCard = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div 
      className="relative max-w-[300px] w-full bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-6 rounded-xl max-w-xs shadow-2xl animate-scale-in">
            <h3 className="text-lg font-semibold mb-3">⚠️ Confirm Selection ⚠️</h3>
            <p className="text-sm text-gray-600 mb-4">This action cannot be undone</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 text-sm border rounded-lg hover:scale-[1.02] active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-square transition-all duration-500 group">
        <img
          src={profile.avatar_img_url}
          alt={profile.screen_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Static Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 pt-12">
          <h3 className="text-lg font-bold text-white truncate drop-shadow-md">{profile.screen_name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.slice(0, 2).map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs font-medium text-white bg-black/30 rounded-full backdrop-blur-sm transition-all hover:bg-black/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Details Panel */}
      <div className={`px-4 pb-4 bg-white transition-all duration-500 ${isHovered ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center animate-slide-up">
            <div>
              <p className="text-sm text-gray-500">{profile.city}, {profile.state}</p>
              <p className="text-xs text-gray-400 mt-1">{profile.country}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">${profile.earnings}</p>
              <p className="text-xs text-gray-400 mt-1">{profile.feedback} Rating</p>
            </div>
          </div>

          <div className="animate-slide-up delay-100">
            <h4 className="font-medium text-gray-800 text-sm">{profile.service_title}</h4>
            <p className="text-xs text-gray-500 line-clamp-3 mt-1.5 leading-relaxed">
              {profile.service_desc}
            </p>
          </div>

          <div className="flex justify-between items-center animate-slide-up delay-200">
            <div>
              <p className="font-medium text-sm">{profile.service_rates.rate_per_hour}</p>
              <p className="text-xs text-gray-400 mt-1">Starting at {profile.service_rates.starting_rate}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={profile.profile_url}
                className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50 hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
              >
                Read More
              </a>
              <button
                onClick={() => setShowConfirmation(true)}
                className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard;
import React from "react";

const freelancers = [
  { name: "Blagoi 1", stars: 6, age: 22, city: "City" },
  { name: "Blagoi 2", stars: 6, age: 45, city: "City" },
  { name: "Blagoi 1", stars: 6, age: 22, city: "City" },
  { name: "Blagoi 2", stars: 6, age: 45, city: "City" },
];

const ServicePage = () => {
  return (
    <div className="min-h-screen p-5 bg-[#fffbf9]">
      <div className="flex flex-wrap justify-center gap-5">
        {freelancers.map((freelancer, index) => (
          <div
            key={index}
            className="w-full max-w-[250px] bg-white p-5 rounded-lg shadow-md"
          >
            <div className="w-full h-36 rounded-lg bg-[#616062]" />
            <div className="mt-4">
              <div className="flex gap-1 text-[#8c281f]">
                {"★".repeat(freelancer.stars)}
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#232323]">
                {freelancer.name}
              </h3>
              <p className="text-[#616062]">
                {freelancer.age} years, {freelancer.city}
              </p>
              <button className="w-full mt-4 px-4 py-2 bg-[#8c281f] text-white rounded hover:bg-[#6a1e17] transition-colors">
                Lorem More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
import React from "react";

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Simplify Projects,<br />Amplify Results
        </h1>
        <p className="text-xl md:text-2xl text-[#616062] mb-8 max-w-2xl mx-auto">
          Elevate your workflow with an all-in-one platform designed to dismantle project chaos, automate task management, and connect you with top-tier freelancers in seconds.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-[#8c281f] text-white px-8 py-4 rounded-lg text-lg hover:opacity-90 transition">
            Try It Free
          </button>
          <button className="border-2 border-[#232323] px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Effortless Project Management</h3>
              <p className="text-[#616062]">Break down complex initiatives into manageable steps, track progress in real-time, and eliminate manual coordination.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Smart Task Automation</h3>
              <p className="text-[#616062]">Let AI divide workloads, assign priorities, and optimize timelines so you can focus on big-picture goals.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Instant Talent Access</h3>
              <p className="text-[#616062]">Tap into a curated network of skilled freelancers tailored to your project's needs—no endless searching or guesswork.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Visionaries */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Built for Visionaries</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { emoji: "🌱", title: "Startups & Entrepreneurs", description: "Scale dynamically without the overhead of full-time hires. Launch faster, adapt smarter." },
            { emoji: "🏛️", title: "Businesses & Agencies", description: "Automate workflows, delegate seamlessly, and hit deadlines with precision." },
            { emoji: "📅", title: "Project Leaders", description: "Organize, assign, and monitor tasks across teams—all from a unified dashboard." },
            { emoji: "✍️", title: "Freelancers & Specialists", description: "Discover projects that align with your expertise and dive into meaningful work." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-2xl mb-4">{item.emoji}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[#616062]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#8c281f] text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Work Smarter, Achieve Faster</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">Transform how you collaborate, execute, and succeed. Try it today—zero hassle, limitless potential.</p>
          <button className="bg-white text-[#8c281f] px-8 py-4 rounded-lg text-lg font-bold hover:opacity-90 transition">
            Start Free Trial
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

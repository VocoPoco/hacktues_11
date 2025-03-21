import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/footer";

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrollProgress(Math.min(scrollY / 300, 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
          style={{
            opacity: 1 - scrollProgress,
            filter: `blur(${scrollProgress * 8}px)`,
            transition: 'all 0.3s ease-out'
          }}
        >
          <source src="/BackgroundVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <Navbar scrollProgress={scrollProgress} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10 pt-20">
        <div className="container mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Simplify Projects,<br />Amplify Results
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Elevate your workflow with an all-in-one platform designed to dismantle project chaos, 
            automate task management, and connect you with top-tier freelancers in seconds.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#8c281f] text-white px-8 py-4 rounded-lg text-lg hover:opacity-90 transition">
              Try It Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 bg-white">
        {/* Why Choose Us */}
        <section className="py-16 md:py-24" id="features">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#232323]">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Effortless Project Management",
                  content: "Break down complex initiatives into manageable steps, track progress in real-time, and eliminate manual coordination."
                },
                {
                  title: "Smart Task Automation",
                  content: "Let AI divide workloads, assign priorities, and optimize timelines so you can focus on big-picture goals."
                },
                {
                  title: "Instant Talent Access",
                  content: "Tap into a curated network of skilled freelancers tailored to your project's needs—no endless searching or guesswork."
                }
              ].map((feature, index) => (
                <div key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#232323]">{feature.title}</h3>
                  <p className="text-[#616062]">{feature.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built for Visionaries */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#232323]">
            Built for Visionaries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                emoji: "🌱", 
                title: "Startups & Entrepreneurs", 
                description: "Scale dynamically without the overhead of full-time hires. Launch faster, adapt smarter." 
              },
              { 
                emoji: "🏛️", 
                title: "Businesses & Agencies", 
                description: "Automate workflows, delegate seamlessly, and hit deadlines with precision." 
              },
              { 
                emoji: "📅", 
                title: "Project Leaders", 
                description: "Organize, assign, and monitor tasks across teams—all from a unified dashboard." 
              },
              { 
                emoji: "✍️", 
                title: "Freelancers & Specialists", 
                description: "Discover projects that align with your expertise and dive into meaningful work." 
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold mb-2 text-[#232323]">{item.title}</h3>
                <p className="text-sm text-[#616062]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#8c281f] text-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Work Smarter, Achieve Faster
            </h2>
            <p className="text-xl mb-8 max-w-xl mx-auto text-white/90">
              Transform how you collaborate, execute, and succeed. Try it today—zero hassle, limitless potential.
            </p>
            <button className="bg-white text-[#8c281f] px-8 py-4 rounded-lg text-lg font-bold hover:opacity-90 transition">
              Start Free Trial
            </button>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
};

export default HomePage;
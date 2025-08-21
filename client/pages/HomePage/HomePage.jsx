import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar.jsx";
import Footer from "../../components/Footer/footer";

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

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
            transition: "all 0.3s ease-out",
          }}
        >
          <source src="/BackgroundVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent"></div>
      </div>

      {/* Navbar with dynamic opacity */}
      <div style={{ 
        opacity: scrollProgress, 
        transition: "opacity 0.3s ease-in-out",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 40
      }}>
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10 pt-20">
        <div className="container mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text-primary)]">
            Simplify Projects,<br />Amplify Results
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Elevate your workflow with an all-in-one platform designed to dismantle project chaos, 
            automate task management, and connect you with top-tier freelancers in seconds.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/create-project")}
              className="bg-[var(--accent-primary)] px-8 py-4 rounded-lg text-lg 
                        hover:bg-[var(--accent-primary)]/90 transition-colors shadow-lg"
            >
              Try It Free
            </button>
            <button className="border-2 border-[var(--accent-secondary)] text-[var(--accent-secondary)] 
                             px-8 py-4 rounded-lg text-lg hover:bg-[var(--hover-overlay)] transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 bg-[var(--bg-secondary)]">
        {/* Why Choose Us */}
        <section className="py-16 md:py-24" id="features">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">
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
                <div key={index} className="p-6 bg-[var(--bg-primary)] rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-[var(--accent-secondary)]">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)]">{feature.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built for Visionaries */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">
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
                className="bg-[var(--bg-primary)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all 
                          border border-[var(--divider)] hover:border-[var(--accent-secondary)]"
              >
                <div className="text-4xl mb-4 text-[var(--accent-primary)]">{item.emoji}</div>
                <h3 className="font-bold mb-2 text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Work Smarter, Achieve Faster
            </h2>
            <p className="text-xl mb-8 max-w-xl mx-auto text-[var(--text-primary)]">
              Transform how you collaborate, execute, and succeed. Try it today—zero hassle, limitless potential.
            </p>
            <button 
              onClick={() => navigate("/create-project")} 
              className="text-[var(--accent-primary)] px-8 py-4 rounded-lg text-lg font-bold 
                        hover:bg-[var(--text-primary)] hover:text-white transition-colors shadow-lg"
            >
              Start Free Trial
            </button>
          </div>
        </section>
      </div>
      
    </main>
  );
};

export default HomePage;
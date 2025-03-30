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
      {/* Video Background with Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover transform scale-105"
          style={{
            opacity: 1 - scrollProgress,
            filter: `blur(${scrollProgress * 8}px)`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <source src="/BackgroundVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent/70 to-transparent"></div>
      </div>

      {/* Floating Navbar */}
      <div 
        className="fixed w-full top-0 z-40 transition-all duration-300"
        style={{ 
          opacity: scrollProgress,
          backdropFilter: `blur(${scrollProgress * 20}px)`,
          backgroundColor: `rgba(var(--bg-primary), ${scrollProgress * 0.8})`
        }}
      >
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10 pt-20 px-6">
        <div className="container mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] leading-tight">
            <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Simplify Projects,
            </span>
            <br />
            <span className="text-[var(--text-primary)]">Amplify Results</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Elevate your workflow with an all-in-one platform designed to dismantle project chaos, 
            automate task management, and connect you with top-tier freelancers in seconds.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/create-project")}
              className="relative overflow-hidden group bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] px-8 py-4 rounded-xl text-lg font-semibold text-white hover:scale-105 transition-transform"
            >
              <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></span>
              Try It Free
            </button>
            
            <button className="border-2 border-[var(--accent-secondary)] text-[var(--accent-secondary)] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[var(--hover-overlay)] transition-all hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
              <span className="mr-2">▶️</span>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 bg-[var(--bg-secondary)] space-y-24 py-24">
        {/* Features Grid */}
        <section className="container mx-auto px-6" id="features">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Why Choose Us?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Revolutionize your workflow with powerful features designed for modern teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Effortless Management",
                content: "Break down complex initiatives into manageable steps",
                icon: "📊"
              },
              {
                title: "Smart Automation",
                content: "AI-powered task prioritization and scheduling",
                icon: "⚡"
              },
              {
                title: "Talent Network",
                content: "Access curated freelancers instantly",
                icon: "👥"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-[var(--bg-primary)] rounded-2xl border border-[var(--divider)] hover:border-[var(--accent-secondary)] transition-all group"
              >
                <div className="text-5xl mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* User Types Grid */}
        <section className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Built for Visionaries
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Trusted by innovators across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Startups", 
                description: "Scale dynamically with agile resources",
                emoji: "🚀"
              },
              { 
                title: "Enterprises", 
                description: "Streamline complex operations",
                emoji: "🏢"
              },
              { 
                title: "Teams", 
                description: "Collaborate seamlessly across timezones",
                emoji: "🌐"
              },
              { 
                title: "Freelancers", 
                description: "Find perfect project matches",
                emoji: "💼"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-6 bg-[var(--bg-primary)] rounded-xl border border-[var(--divider)] hover:border-[var(--accent-secondary)] transition-all group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] relative overflow-hidden">
          <div className="container mx-auto px-6 py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Transform?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Start your free trial today and experience the future of project management
              </p>
              <button 
                onClick={() => navigate("/create-project")} 
                className="text-[var(--accent-primary)] px-8 py-4 rounded-xl text-lg font-bold hover:bg-opacity-90 transition-all"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </section>
      </div>

    </main>
  );
};

export default HomePage;
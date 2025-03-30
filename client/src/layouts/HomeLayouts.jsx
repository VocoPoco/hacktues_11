// HomeComponents.jsx
import React from 'react';
import { CTAButton } from '../components/styles';

const defaultColors = {
  // Light Mode
  gradientFrom: '#fafafa',
  gradientTo: 'rgba(250, 250, 250, 0.1)',
  primary: '#c5a47f', // Warm champagne gold
  textLight: '#2a2a2a',
  backgroundLight: '#ffffff',
  cardBackgroundLight: '#f8f8f8',
  
  // Dark Mode
  gradientFromDark: '#121212', // Matches header/footer dark bg
  gradientToDark: 'rgba(18, 18, 18, 0.1)',
  primaryDark: '#d4af37', // Antique gold
  textDark: '#e5e5e5', // Soft white
  backgroundDark: '#121212', // Deep charcoal
  cardBackgroundDark: '#1a1a1a' // Slightly lighter than background
};

export const Home1 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] dark:from-[var(--gradient-from-dark)] dark:to-[var(--gradient-to-dark)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-24">
        <div className="w-full md:w-1/2 md:pr-16">
          <div className="border-l-4 border-[var(--primary)] dark:border-[var(--primary-dark)] pl-6 mb-12">
            <span className="text-sm tracking-widest text-[var(--primary)] dark:text-[var(--primary-dark)]">AI-POWERED PRECISION</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-light text-[var(--text-light)] dark:text-[var(--text-dark)]">
              Digital Craftsmanship
              <span className="block mt-2 text-[var(--primary)] dark:text-[var(--primary-dark)]">Perfected</span>
            </h1>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/video-bg3.mp4" type="video/mp4" />
            </video>
          </div>
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-[var(--primary)] dark:border-[var(--primary-dark)] rounded-full animate-pulse" />
            </div> */}
        </div>

        <div className="w-full md:w-1/2 mt-16 md:mt-0">
          <div className="pl-8 border-l border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
            <p className="text-lg text-[var(--text-light)] dark:text-[var(--text-dark)] mb-8 leading-relaxed">
              Where computational precision meets human creativity in perfect harmony
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-[var(--primary)] dark:bg-[var(--primary-dark)] text-white hover:opacity-90 transition-opacity">
                Begin Journey
              </button>
              <button className="px-8 py-3 border border-[var(--primary)] dark:border-[var(--primary-dark)] text-[var(--primary)] dark:text-[var(--primary-dark)] hover:bg-[var(--primary)]/10">
                Explore Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home2 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <div className="min-h-screen bg-[var(--background-light)] dark:bg-[var(--background-dark)]">
      <div className="container mx-auto px-6 py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 inline-block border-b border-[var(--primary)] dark:border-[var(--primary-dark)] pb-2">
            <span className="text-sm tracking-widest text-[var(--primary)] dark:text-[var(--primary-dark)]">ARCHITECTURAL VISION</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-8 text-[var(--text-light)] dark:text-[var(--text-dark)]">
            Structural
            <span className="block mt-4 text-[var(--primary)] dark:text-[var(--primary-dark)]">Integrity</span>
          </h1>
          
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12 mx-8 border border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/video-bg2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[var(--primary)]/5 dark:bg-[var(--primary-dark)]/5" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {['Precision', 'Clarity', 'Elegance'].map((item) => (
              <div key={item} className="border-t border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20 pt-4">
                <h3 className="text-lg text-[var(--primary)] dark:text-[var(--primary-dark)]">{item}</h3>
                <p className="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)] mt-2">Algorithmically optimized digital foundations</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home3 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] dark:from-[var(--gradient-from-dark)] dark:to-[var(--gradient-to-dark)]">      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square rounded-full overflow-hidden border border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/video-bg4.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[var(--primary)]/5 dark:bg-[var(--primary-dark)]/5" />
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="border-l-4 border-[var(--primary)] dark:border-[var(--primary-dark)] pl-6">
              <h2 className="text-sm text-[var(--primary)] dark:text-[var(--primary-dark)] mb-2">HOLISTIC APPROACH</h2>
              <h1 className="text-4xl font-light text-[var(--text-light)] dark:text-[var(--text-dark)]">
                Integrated
                <span className="block mt-2 text-[var(--primary)] dark:text-[var(--primary-dark)]">Solutions</span>
              </h1>
            </div>
            <p className="mt-8 text-lg text-[var(--text-light)] dark:text-[var(--text-dark)] leading-relaxed">
              Unified systems combining technical excellence with aesthetic mastery
            </p>
            <div className="mt-8 grid gap-4">
              {['AI Architecture', 'Dynamic Systems', 'Responsive Design'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--primary)] dark:bg-[var(--primary-dark)] rounded-full" />
                  <p className="text-[var(--text-light)] dark:text-[var(--text-dark)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home4 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <div className="min-h-screen bg-[var(--background-light)] dark:bg-[var(--background-dark)]">
      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="border-l-4 border-[var(--primary)] dark:border-[var(--primary-dark)] pl-6">
              <h2 className="text-sm text-[var(--primary)] dark:text-[var(--primary-dark)] mb-2">PRECISION ENGINEERING</h2>
              <h1 className="text-4xl font-light text-[var(--text-light)] dark:text-[var(--text-dark)]">
                Technical
                <span className="block mt-2 text-[var(--primary)] dark:text-[var(--primary-dark)]">Mastery</span>
              </h1>
            </div>
            
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/video-bg5.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-[var(--card-background-light)] dark:bg-[var(--card-background-dark)] rounded-lg p-4">
                <div className="w-full h-full rounded-lg overflow-hidden border border-[var(--primary)]/10 dark:border-[var(--primary-dark)]/10">
                  <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                    <source src="/video-bg1.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home5 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] dark:from-[var(--gradient-from-dark)] dark:to-[var(--gradient-to-dark)]">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block border-b border-[var(--primary)] dark:border-[var(--primary-dark)] pb-2 mb-12">
            <span className="text-sm tracking-widest text-[var(--primary)] dark:text-[var(--primary-dark)]">DIGITAL EXCELLENCE</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-8 text-[var(--text-light)] dark:text-[var(--text-dark)]">
            Pioneering
            <span className="block mt-4 text-[var(--primary)] dark:text-[var(--primary-dark)]">Innovation</span>
          </h1>
          
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12 mx-8 border border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/video-bg3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-light)]/80 dark:from-[var(--background-dark)]/80 flex items-end p-6">
              <p className="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)]">Next-generation development process</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-[var(--primary)] dark:bg-[var(--primary-dark)] text-white hover:opacity-90 transition-opacity">
              Start Creating
            </button>
            <button className="px-8 py-3 border border-[var(--primary)] dark:border-[var(--primary-dark)] text-[var(--primary)] dark:text-[var(--primary-dark)] hover:bg-[var(--primary)]/10">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home6 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <div className="min-h-screen bg-[var(--background-light)] dark:bg-[var(--background-dark)]">
     <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="border-l-4 border-[var(--primary)] dark:border-[var(--primary-dark)] pl-6">
              <h2 className="text-sm text-[var(--primary)] dark:text-[var(--primary-dark)] mb-2">STRATEGIC VISION</h2>
              <h1 className="text-4xl font-light text-[var(--text-light)] dark:text-[var(--text-dark)]">
                Intelligent
                <span className="block mt-2 text-[var(--primary)] dark:text-[var(--primary-dark)]">Systems</span>
              </h1>
            </div>
            
            <p className="text-lg text-[var(--text-light)] dark:text-[var(--text-dark)] leading-relaxed">
              Architecting digital solutions that evolve with your enterprise needs
            </p>
            
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/video-bg4.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-[var(--card-background-light)] dark:bg-[var(--card-background-dark)] rounded-lg p-4">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                      <source src="/video-bg5.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20 pt-6">
              <p className="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)]">Modular components for scalable growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home7 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] dark:from-[var(--gradient-from-dark)] dark:to-[var(--gradient-to-dark)]">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border-b border-[var(--primary)] dark:border-[var(--primary-dark)] pb-2">
              <span className="text-sm tracking-widest text-[var(--primary)] dark:text-[var(--primary-dark)]">FUTURE VISION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light mt-8 text-[var(--text-light)] dark:text-[var(--text-dark)]">
              Architectural
              <span className="block mt-4 text-[var(--primary)] dark:text-[var(--primary-dark)]">Innovation</span>
            </h1>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--primary)]/20 dark:border-[var(--primary-dark)]/20">
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/video-bg1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-light)]/80 dark:from-[var(--background-dark)]/80 flex items-end p-6">
              <div className="w-full flex justify-between items-center">
                <p className="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)]">Next-generation framework visualization</p>
                <CTAButton className="!bg-[var(--primary)] dark:!bg-[var(--primary-dark)] !text-white">
                  Explore Future
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
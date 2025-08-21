import React from "react";

const defaultColors = {
  // Light Mode - High Contrast Professional
  primary: "#1e293b",
  primaryHover: "#334155",
  backgroundLight: "#ffffff",
  textLight: "#0f172a",
  borderLight: "#cbd5e1",
  cardLight: "#f1f5f9",

  // Dark Mode - High Contrast Corporate
  primaryDark: "#f1f5f9",
  primaryHoverDark: "#e2e8f0",
  backgroundDark: "#0f172a",
  textDark: "#ffffff",
  borderDark: "#475569",
  cardDark: "#1e293b",
};

export const Footer1 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-12 border-t-2 border-[var(--borderLight)] dark:border-[var(--borderDark)] shadow-lg"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardLight": vars.cardLight,
        "--cardDark": vars.cardDark,
        "--borderLight": vars.borderLight,
        "--borderDark": vars.borderDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-[var(--textLight)] dark:text-[var(--textDark)] font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] transition-colors">
          © {new Date().getFullYear()} <span className="font-serif font-bold">FREELENS</span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export const Footer2 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer 
      className="bg-gradient-to-b from-[var(--primary)] to-[var(--primaryHover)] dark:bg-gradient-to-b dark:from-[var(--cardDark)] dark:to-[var(--backgroundDark)] py-16 text-white dark:text-[var(--textDark)] border-t-2 border-[var(--primary)]/30 dark:border-[var(--primaryDark)]/30 shadow-lg"
      style={{
        '--primary': vars.primary,
        '--primaryHover': vars.primaryHover,
        '--cardDark': vars.cardDark,
        '--backgroundDark': vars.backgroundDark,
        '--textDark': vars.textDark,
        '--primaryDark': vars.primaryDark
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-2xl mb-4 font-bold">Architectural Digital Craft</h2>
        <div className="w-px h-8 bg-white/30 dark:bg-[var(--textDark)]/30 mx-auto my-6" />
        <p className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
          © {new Date().getFullYear()} Precision Engineered Systems
        </p>
      </div>
    </footer>
  );
};

export const Footer3 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-12 border-t-2 border-[var(--borderLight)] dark:border-[var(--borderDark)] shadow-lg"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardLight": vars.cardLight,
        "--cardDark": vars.cardDark,
        "--borderLight": vars.borderLight,
        "--borderDark": vars.borderDark,
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <nav className="flex justify-center gap-6 mb-6">
          {["Instagram", "LinkedIn", "Twitter"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm uppercase font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="w-px h-8 bg-[var(--primary)]/30 dark:bg-[var(--primaryDark)]/30 mx-auto my-6" />
        <p className="text-xs text-[var(--textLight)] dark:text-[var(--textDark)] font-medium">
          © {new Date().getFullYear()} Digital Atelier Group
        </p>
      </div>
    </footer>
  );
};

export const Footer4 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-16 border-t-2 border-[var(--borderLight)] dark:border-[var(--borderDark)] shadow-lg"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardLight": vars.cardLight,
        "--cardDark": vars.cardDark,
        "--borderLight": vars.borderLight,
        "--borderDark": vars.borderDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-serif text-xl mb-4 font-bold hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] transition-colors">
          Structural Perfection
        </h3>
        <p className="text-sm text-[var(--textLight)] dark:text-[var(--textDark)] max-w-2xl mx-auto mb-8 font-medium">
          Algorithmically crafted digital experiences with human oversight
        </p>
        <div className="w-px h-8 bg-[var(--primary)]/30 dark:bg-[var(--primaryDark)]/30 mx-auto" />
      </div>
    </footer>
  );
};

export const Footer5 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-20 border-t-2 border-[var(--borderLight)] dark:border-[var(--borderDark)] shadow-lg"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--cardLight": vars.cardLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardDark": vars.cardDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
        "--borderLight": vars.borderLight,
        "--borderDark": vars.borderDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl mb-6 text-[var(--textLight)] dark:text-[var(--textDark)] font-bold">
          Begin Your Ascent
        </h2>
        <button className="px-8 py-3 border-2 border-[var(--textLight)] dark:border-[var(--textDark)] text-[var(--textLight)] dark:text-[var(--textDark)] hover:bg-[var(--textLight)]/10 dark:hover:bg-[var(--textDark)]/10 transition-colors duration-300 font-medium">
          Initiate Project
        </button>
      </div>
    </footer>
  );
};

export const Footer6 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-20 border-t-2 border-[var(--primary)] dark:border-[var(--primaryDark)] shadow-lg"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardLight": vars.cardLight,
        "--cardDark": vars.cardDark,
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
        "--primaryHover": vars.primaryHover,
        "--primaryHoverDark": vars.primaryHoverDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl mb-6 text-[var(--textLight)] dark:text-[var(--textDark)] font-bold">
          Craft Your Legacy
        </h2>
        <div className="flex justify-center gap-6 mb-8">
          <button className="px-6 py-3 bg-[var(--primary)] dark:bg-[var(--primaryDark)] text-white hover:bg-[var(--primaryHover)] dark:hover:bg-[var(--primaryHoverDark)] transition-colors font-medium">
            Start Project
          </button>
          <button className="px-6 py-3 border-2 border-[var(--primary)] dark:border-[var(--primaryDark)] text-[var(--primary)] dark:text-[var(--primaryDark)] hover:bg-[var(--primary)]/10 transition-colors font-medium">
            View Portfolio
          </button>
        </div>
        <div className="w-px h-12 bg-[var(--primary)]/30 dark:bg-[var(--primaryDark)]/30 mx-auto my-6" />
        <p className="text-sm text-[var(--textLight)] dark:text-[var(--textDark)] font-medium">
          © {new Date().getFullYear()} NOBLE DIGITAL WORKS
        </p>
      </div>
    </footer>
  );
};

export const Footer7 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-12 border-t-2 border-[var(--primary)] dark:border-[var(--primaryDark)] shadow-lg"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardLight": vars.cardLight,
        "--cardDark": vars.cardDark,
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center gap-6 mb-4">
          {["Modules", "Analytics", "Security"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm uppercase font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[var(--primary)] dark:after:bg-[var(--primaryDark)] hover:after:w-full after:transition-all"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="w-px h-12 bg-[var(--primary)]/30 dark:bg-[var(--primaryDark)]/30 mx-auto my-6" />
        <p className="text-xs text-[var(--textLight)] dark:text-[var(--textDark)] font-medium mt-6 hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] transition-colors">
          © {new Date().getFullYear()} Financial Systems Architect
        </p>
      </div>
    </footer>
  );
};
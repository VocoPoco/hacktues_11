import React from "react";

const defaultColors = {
  // Light Mode
  primary: "#c5a47f",
  primaryHover: "#b08f6a",
  backgroundLight: "#f9f9f9",
  textLight: "#2a2a2a",
  borderLight: "#e5e7eb",
  cardLight: "#ffffff",

  // Dark Mode
  primaryDark: "#d4af37",
  primaryHoverDark: "#c5a347",
  backgroundDark: "#0a0a0a",
  textDark: "#f5f5f5",
  borderDark: "#333333",
  cardDark: "#1a1a1a",
};

export const Footer1 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-12 border-t border-[var(--borderLight)]/50 dark:border-[var(--borderDark)]/30"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardLight": vars.cardLight,
        "--cardDark": vars.cardDark,
        "--borderLight": vars.borderLight,
        "--borderDark": vars.borderDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-[var(--textLight)] dark:text-[var(--textDark)]/80 font-light hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] transition-colors">
          © {new Date().getFullYear()} <span className="font-serif">LUXE</span>
          WEB. All rights preserved.
        </p>
      </div>
    </footer>
  );
};

export const Footer2 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer 
      className="bg-gradient-to-b from-[var(--primary)]/90 to-[var(--primary)]/70 dark:bg-gradient-to-b dark:from-[var(--cardDark)] dark:to-[var(--backgroundDark)] py-16 text-[var(--cardLight)] dark:text-[var(--primaryDark)]"
      style={{
        '--primary': vars.primary,
        '--cardDark': vars.cardDark,
        '--backgroundDark': vars.backgroundDark,
        '--cardLight': vars.cardLight,
        '--primaryDark': vars.primaryDark
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-2xl mb-4">Architectural Digital Craft</h2>
        <div className="w-px h-8 bg-[var(--cardLight)]/30 dark:bg-[var(--primaryDark)]/30 mx-auto my-6" />
        <p className="text-sm font-light opacity-90 hover:opacity-100 transition-opacity">
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
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-12 border-t border-[var(--borderLight)]/50 dark:border-[var(--borderDark)]/30"
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
              className="text-sm uppercase hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="w-px h-8 bg-[var(--primary)]/20 dark:bg-[var(--primaryDark)]/20 mx-auto my-6" />
        <p className="text-xs text-[var(--textLight)] dark:text-[var(--textDark)]/80">
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
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-16 border-t border-[var(--borderLight)]/50 dark:border-[var(--borderDark)]/30"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardLight": vars.cardLight,
        "--cardDark": vars.cardDark,
        "--borderLight": vars.borderLight,
        "--borderDark": vars.borderDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-serif text-xl mb-4 hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] transition-colors">
          Structural Perfection
        </h3>
        <p className="text-sm text-[var(--textLight)] dark:text-[var(--textDark)]/80 max-w-2xl mx-auto mb-8">
          Algorithmically crafted digital experiences with human oversight
        </p>
        <div className="w-px h-8 bg-[var(--primary)]/20 dark:bg-[var(--primaryDark)]/20 mx-auto" />
      </div>
    </footer>
  );
};


export const Footer5 = ({ colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <footer
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-20"
      style={{
        "--backgroundLight": vars.backgroundLight,
        "--cardLight": vars.cardLight,
        "--backgroundDark": vars.backgroundDark,
        "--cardDark": vars.cardDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl mb-6 text-[var(--textLight)] dark:text-[var(--textDark)]">
          Begin Your Ascent
        </h2>
        <button className="px-8 py-3 border border-[var(--textLight)] dark:border-[var(--textDark)] text-[var(--textLight)] dark:text-[var(--textDark)] hover:bg-[var(--textLight)]/10 dark:hover:bg-[var(--textDark)]/10 transition-colors duration-300">
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
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-20 border-t border-[var(--primary)]/20"
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
        <h2 className="font-serif text-3xl mb-6 text-[var(--textLight)] dark:text-[var(--textDark)]">
          Craft Your Legacy
        </h2>
        <div className="flex justify-center gap-6 mb-8">
          <button className="px-6 py-3 bg-[var(--primary)] dark:bg-[var(--primaryDark)] text-white hover:bg-[var(--primaryHover)] dark:hover:bg-[var(--primaryHoverDark)] transition-colors">
            Start Project
          </button>
          <button className="px-6 py-3 border border-[var(--primary)] dark:border-[var(--primaryDark)] text-[var(--primary)] dark:text-[var(--primaryDark)] hover:bg-[var(--primary)]/10 transition-colors">
            View Portfolio
          </button>
        </div>
        <div className="w-px h-12 bg-[var(--primary)]/20 dark:bg-[var(--primaryDark)]/20 mx-auto my-6" />
        <p className="text-sm text-[var(--textLight)] dark:text-[var(--textDark)]/80">
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
      className="bg-gradient-to-b from-[var(--backgroundLight)] to-[var(--cardLight)] dark:bg-gradient-to-b dark:from-[var(--backgroundDark)] dark:to-[var(--cardDark)] py-12 border-t border-[var(--primary)]/20 dark:border-[var(--primaryDark)]/20"
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
              className="text-sm uppercase hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[var(--primary)] dark:after:bg-[var(--primaryDark)] hover:after:w-full after:transition-all"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="w-px h-12 bg-[var(--primary)]/20 dark:bg-[var(--primaryDark)]/20 mx-auto my-6" />
        <p className="text-xs text-[var(--textLight)] dark:text-[var(--textDark)]/60 mt-6 hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] transition-colors">
          © {new Date().getFullYear()} Financial Systems Architect
        </p>
      </div>
    </footer>
  );
};
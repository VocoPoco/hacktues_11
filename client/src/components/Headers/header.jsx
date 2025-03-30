import React from "react";
import { Container } from "../styles";

const defaultColors = {
  // Light Mode
  primary: "#c5a47f",
  backgroundLight: "#ffffff",
  textLight: "#2a2a2a",
  borderLight: "#e5e7eb",
  
  // Dark Mode
  primaryDark: "#d4af37",
  backgroundDark: "#121212",
  textDark: "#e5e5e5",
  borderDark: "#2a2a2a",
};

export const Header1 = ({ isVisible, colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <header
      className={`fixed top-0 w-full bg-[var(--backgroundLight)]/95 dark:bg-[var(--backgroundDark)]/95 backdrop-blur-sm border-b border-[var(--borderLight)]/50 dark:border-[var(--primaryDark)]/30 z-40 py-3 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--borderLight": vars.borderLight,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <span className="text-xl font-playfair text-[var(--primary)] dark:text-[var(--primaryDark)] tracking-widest">
          LUXE
        </span>
        <nav className="flex gap-6">
          {[
            { label: "Home", path: "/" },
            { label: "Collections", path: "/collections" },
            { label: "Experience", path: "/experience" },
            { label: "Journal", path: "/journal" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="text-sm uppercase tracking-wider hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className="px-4 py-2 text-sm uppercase border border-[var(--primary)] dark:border-[var(--primaryDark)] text-[var(--primary)] dark:text-[var(--primaryDark)] hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primaryDark)]/5">
          Contact
        </button>
      </div>
    </header>
  );
};

export const Header2 = ({ isVisible, colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <header
      className={`fixed top-0 w-full bg-[var(--backgroundLight)]/95 dark:bg-[var(--backgroundDark)]/95 backdrop-blur-sm border-b border-[var(--borderLight)]/50 dark:border-[var(--primaryDark)]/30 z-40 py-3 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--borderLight": vars.borderLight,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <span className="text-2xl font-cormorant italic text-[var(--primary)] dark:text-[var(--primaryDark)]">
          Élan
        </span>
        <nav className="flex gap-6">
          {[
            { label: "Portfolio", path: "/portfolio" },
            { label: "Services", path: "/services" },
            { label: "Clients", path: "/clients" },
            { label: "Journal", path: "/journal" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="text-sm uppercase tracking-widest hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="w-px h-6 bg-[var(--borderLight)] dark:bg-[var(--primaryDark)]/30 mx-4" />
        <button className="text-sm uppercase hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)]">
          Menu
        </button>
      </div>
    </header>
  );
};

export const Header3 = ({ isVisible, colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <header
      className={`fixed top-0 w-full bg-[var(--backgroundLight)]/95 dark:bg-[var(--backgroundDark)]/95 backdrop-blur-sm border-b border-[var(--borderLight)]/50 dark:border-[var(--primaryDark)]/30 z-40 py-3 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--borderLight": vars.borderLight,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <span className="text-xl font-playfair text-[var(--primary)] dark:text-[var(--primaryDark)] tracking-widest">
          AUREUM
        </span>
        <nav className="flex gap-6">
          {[
            { label: "Investments", path: "/investments" },
            { label: "Projects", path: "/projects" },
            { label: "Team", path: "/team" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="text-sm uppercase tracking-wider hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-[var(--primary)] dark:bg-[var(--primaryDark)]" />
          <span className="text-sm uppercase">EN</span>
        </div>
      </div>
    </header>
  );
};

export const Header4 = ({ isVisible, colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <header
      className={`fixed top-0 w-full bg-[var(--backgroundLight)]/95 dark:bg-[var(--backgroundDark)]/95 backdrop-blur-sm border-b border-[var(--borderLight)]/50 dark:border-[var(--primaryDark)]/30 z-40 py-3 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--borderLight": vars.borderLight,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[var(--primary)] dark:border-[var(--primaryDark)] rounded-full" />
          <span className="text-lg font-medium text-[var(--textLight)] dark:text-[var(--textDark)]">
            NOBILIS
          </span>
        </div>
        <nav className="flex gap-6">
          {[
            { label: "Properties", path: "/properties" },
            { label: "Developers", path: "/developers" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="text-sm uppercase tracking-wider hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="w-px h-6 bg-[var(--borderLight)] dark:bg-[var(--primaryDark)]/30" />
        <button className="text-sm uppercase">Menu</button>
      </div>
    </header>
  );
};

export const Header5 = ({ isVisible, colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <header
      className={`fixed top-0 w-full bg-[var(--backgroundLight)]/95 dark:bg-[var(--backgroundDark)]/95 backdrop-blur-sm z-40 py-3 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <nav className="flex divide-x divide-[var(--primary)]/20 dark:divide-[var(--primaryDark)]/20">
          <div className="pr-6">
            {[
              { label: "Architecture", path: "/architecture" },
              { label: "Interiors", path: "/interiors" },
              { label: "Landscape", path: "/landscape" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="text-sm uppercase hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors mr-6"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pl-6">
            {[
              { label: "Studio", path: "/studio" },
              { label: "Approach", path: "/approach" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="text-sm uppercase hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors ml-6"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="w-6 h-px bg-[var(--primary)] dark:bg-[var(--primaryDark)]" />
      </div>
    </header>
  );
};

export const Header6 = ({ isVisible, colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <header
      className={`fixed top-0 w-full bg-[var(--backgroundLight)]/95 dark:bg-[var(--backgroundDark)]/95 backdrop-blur-sm border-b border-[var(--borderLight)]/50 dark:border-[var(--primaryDark)]/30 z-40 py-3 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--borderLight": vars.borderLight,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <Container className="flex justify-between items-center">
        <div className="text-xl font-medium text-[var(--primary)] dark:text-[var(--primaryDark)]">
          ÆTHERFIT
        </div>
        <nav className="flex gap-6">
          {[
            { label: "Philosophy", path: "/philosophy" },
            { label: "Practice", path: "/practice" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="text-sm uppercase hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
};

export const Header7 = ({ isVisible, colors }) => {
  const vars = { ...defaultColors, ...colors };
  return (
    <header
      className={`fixed w-full top-0 bg-[var(--backgroundLight)]/95 dark:bg-[var(--backgroundDark)]/95 backdrop-blur-sm border-b border-[var(--borderLight)]/50 dark:border-[var(--primaryDark)]/30 z-40 py-3 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        "--primary": vars.primary,
        "--primaryDark": vars.primaryDark,
        "--backgroundLight": vars.backgroundLight,
        "--backgroundDark": vars.backgroundDark,
        "--borderLight": vars.borderLight,
        "--textLight": vars.textLight,
        "--textDark": vars.textDark,
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <h1 className="text-lg font-medium text-[var(--primary)] dark:text-[var(--primaryDark)]">
          FinanceMaster
        </h1>
        <nav className="flex gap-6">
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Reports", path: "/reports" },
            { label: "Tools", path: "/tools" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="text-sm uppercase hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] text-[var(--textLight)] dark:text-[var(--textDark)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="w-6 h-px bg-[var(--primary)] dark:bg-[var(--primaryDark)]" />
      </nav>
    </header>
  );
};

import { X } from "lucide-react";

// NAVBAR 1 - Dark Elegance
export const Navbar1 = ({ onClose }) => (
  <aside className="fixed top-0 left-0 h-screen bg-gray-900/95 backdrop-blur-sm w-64 p-6 flex flex-col border-r border-gold-500/30 shadow-2xl z-50">
    <button onClick={onClose} className="absolute top-4 right-4 text-gold-500 hover:text-gold-400 transition-colors">
      <X size={20} />
    </button>
    <div className="mb-12">
      <span className="text-2xl font-playfair text-gold-500 tracking-wider">LUXE</span>
    </div>
    <nav className="flex flex-col gap-5 flex-grow">
      {['Home', 'Collections', 'Experience', 'Journal', 'Contact'].map((item) => (
        <a key={item} href="#" className="group px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-light text-sm uppercase tracking-wider text-gray-300 group-hover:text-gold-500">
              {item}
            </span>
          </div>
        </a>
      ))}
    </nav>
    <div className="text-gray-500 text-xs mt-8">© {new Date().getFullYear()} Luxe Designs</div>
  </aside>
);

// NAVBAR 2 - Minimalist Light
export const Navbar2 = ({ onClose }) => (
  <aside className="fixed top-0 left-0 h-screen bg-ivory-50/95 backdrop-blur-sm w-72 p-8 shadow-2xl z-50">
    <button onClick={onClose} className="absolute top-4 right-4 text-gold-600 hover:text-gold-700 transition-colors">
      <X size={20} />
    </button>
    <div className="mb-16 border-b border-gold-300/40 pb-6">
      <span className="text-3xl font-cormorant italic text-gray-800">Élan</span>
    </div>
    <nav className="flex flex-col gap-5">
      {['About', 'Portfolio', 'Services', 'Clients', 'News'].map((item) => (
        <a
          key={item}
          href="#"
          className="px-4 py-3 rounded-md text-gray-600 hover:text-gold-600 hover:bg-gold-50 transition-all duration-200"
        >
          <span className="font-montserrat text-sm uppercase tracking-widest flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-gold-400 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
            {item}
          </span>
        </a>
      ))}
    </nav>
    <div className="mt-auto pt-12">
      <button type="button" className="w-full py-3 text-sm uppercase tracking-wide border-2 border-gold-500 text-gold-500 hover:bg-gold-500/10 rounded-lg">
        Book Consultation
      </button>
    </div>
  </aside>
);

// NAVBAR 3 - Vertical Logo
export const Navbar3 = ({ onClose }) => (
  <aside className="fixed top-0 left-0 h-screen bg-gray-800/95 backdrop-blur-sm w-20 hover:w-64 transition-all duration-500 group overflow-hidden shadow-2xl z-50">
    <button onClick={onClose} className="absolute top-4 right-4 text-gold-400 hover:text-gold-300 transition-colors">
      <X size={20} />
    </button>
    <div className="absolute top-12 left-0 -rotate-90 origin-left">
      <span className="text-xl font-playfair text-gold-500 tracking-widest">AUREUM</span>
    </div>
    <nav className="flex flex-col gap-6 mt-48 px-6">
      {['Discover', 'Projects', 'Team', 'Investments', 'Connect'].map((item) => (
        <a
          key={item}
          href="#"
          className="flex items-center gap-4 text-gray-400 hover:text-gold-400 py-2"
        >
          <div className="w-5 h-px bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm uppercase tracking-wider truncate transform translate-x-0 group-hover:translate-x-3 transition-transform">
            {item}
          </span>
        </a>
      ))}
    </nav>
  </aside>
);

// NAVBAR 4 - Glass Panel
export const Navbar4 = ({ onClose }) => (
  <aside className="fixed top-0 left-0 h-screen w-80 p-10 bg-white/95 backdrop-blur-lg shadow-2xl border-r border-gray-100/50 z-50">
    <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gold-600 transition-colors">
      <X size={20} />
    </button>
    <div className="mb-20 flex items-center gap-3">
      <div className="w-8 h-8 bg-gold-500 rounded-full" />
      <span className="text-xl font-bold text-gray-800">NOBILIS</span>
    </div>
    <nav className="flex flex-col gap-6">
      {['Home', 'Properties', 'Developers', 'About', 'Contact'].map((item) => (
        <a
          key={item}
          href="#"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gold-50 transition-all"
        >
          <div className="w-6 h-6 bg-gold-400/20 rounded-full group-hover:bg-gold-400/40 transition-colors flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gold-600 rounded-full group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-gray-700 text-sm uppercase tracking-wider font-medium group-hover:text-gold-700">{item}</span>
        </a>
      ))}
    </nav>
    <div className="mt-24 border-t border-gray-200 pt-8">
      <p className="text-xs text-gray-600 leading-relaxed">
        45 Park Avenue<br />
        New York, NY 10016<br />
        +1 (212) 555-0189
      </p>
    </div>
  </aside>
);

// NAVBAR 5 - Asymmetric
export const Navbar5 = ({ onClose }) => (
  <aside className="fixed top-0 left-0 h-screen w-96 shadow-2xl z-50">
    <button onClick={onClose} className="absolute top-4 right-4 text-gold-500 hover:text-gold-400 transition-colors">
      <X size={20} />
    </button>
    <div className="absolute inset-0 bg-gray-900/95 w-3/5 shadow-lg backdrop-blur-sm" />
    <div className="absolute inset-0 bg-white/95 left-3/5 w-2/5 shadow-lg backdrop-blur-sm" />
    <div className="relative z-10 h-full flex">
      <div className="w-3/5 p-8 flex flex-col">
        <div className="text-gold-500 text-2xl mb-20">◆</div>
        <nav className="flex flex-col gap-5">
          {['Design', 'Architecture', 'Interiors', 'Landscape'].map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-3 rounded-md text-gray-300 hover:text-gold-500 hover:bg-gray-800/50 transition-all"
            >
              <span className="text-sm uppercase tracking-wider">{item}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="w-2/5 p-8 flex flex-col border-l border-gray-200">
        <nav className="flex flex-col gap-5 mt-20">
          {['Studio', 'Approach', 'Awards', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-3 rounded-md text-gray-700 hover:text-gold-600 hover:bg-gold-50 transition-all"
            >
              <span className="text-sm uppercase tracking-wider">{item}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  </aside>
);


import { CTAButton } from '../styles';

export const Hero1 = ({ title, subtitle, cta }) => (
  <section className="py-20 text-center">
    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--mist)] to-[var(--moonstone)] bg-clip-text text-transparent">
      {title}
    </h1>
    <p className="text-xl text-[var(--silver)] mb-8 max-w-2xl mx-auto">
      {subtitle}
    </p>
    <CTAButton href="#">
      {cta}
    </CTAButton>
  </section>
);

// components/Hero.jsx
export default function Hero2() {
    return (
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Master Your Money</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Take control of your financial future with smart budgeting, expense tracking, and personalized financial insights.
          </p>
          <button 
            style={{ backgroundColor: '#1d776b' }}
            className="text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>
      </section>
    );
  }
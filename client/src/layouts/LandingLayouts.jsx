import { GlobalStyles, Container } from './components/styles';
import { Navbar, Hero, Features, Audience, Footer } from './components';

export const Landing = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <Container>
      <Hero
        title="Unleash Your Celestial Form"
        subtitle="Transcend mortal limits through enigmatic training protocols and alchemical nourishment"
        cta="Begin Ascension"
      />
      <Features />
      <Audience />
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[var(--mist)] to-[var(--moonstone)] bg-clip-text text-transparent">
          Forge Body, Transcend Flesh
        </h2>
        <CTAButton href="#">
          Commence Transformation
        </CTAButton>
      </section>
    </Container>
    <Footer />
  </>
);
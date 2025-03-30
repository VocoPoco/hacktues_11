import { Card } from '../styles';

const FEATURES = [
  {
    title: 'Arcane Programs',
    description: 'Esoteric regimens attuned to your primal nature and temporal constraints'
  },
  {
    title: 'Ethereal Nourishment',
    description: 'Alchemical dietary optimization with celestial macro tracking'
  },
  {
    title: 'Oracular Insights',
    description: 'Chronovision of your metamorphosis through ancient analytics'
  }
];

export const Features1 = () => (
  <section id="features" className="py-16">
    <h2 className="text-3xl font-bold text-center mb-12 text-[var(--moonstone)]">
      Why Walk the Path?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {FEATURES.map((feature, index) => (
        <Card key={index}>
          <h3 className="text-xl font-bold mb-4 text-[var(--moonstone)]">
            {feature.title}
          </h3>
          <p className="text-[var(--silver)]">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  </section>
);


// components/Features.jsx
export const Features2 = ({ features }) => {
    return (
      <section className="py-16 px-4" style={{ backgroundColor: '#f5fffc' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Our App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-white shadow-sm">
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1d776b' }}>{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
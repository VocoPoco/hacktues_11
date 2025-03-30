import { Card } from '../styles';

const AUDIENCE = [
  { icon: '🌌', title: 'Neophytes', description: 'Initiation rites for unproven vessels' },
  { icon: '⚔️', title: 'Warriors', description: 'Forge your legend in the crucible of excellence' },
  { icon: '⏳', title: 'Timebound', description: 'Transcend temporal limitations through focused rituals' },
  { icon: '🔮', title: 'Mentors', description: 'Channel your wisdom through our sacred conduit' }
];

export const Audience1 = () => (
  <section id="audience" className="py-16">
    <h2 className="text-3xl font-bold text-center mb-12 text-[var(--mist)]">
      Chosen Vessels
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {AUDIENCE.map((item, index) => (
        <Card key={index} className="text-center">
          <div className="text-4xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-sm text-[var(--silver)]">{item.description}</p>
        </Card>
      ))}
    </div>
  </section>
);

export const Audience2 = ({ audienceGroups }) => {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Perfect for Everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {audienceGroups.map((group, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-4xl mb-4" style={{ color: '#1d776b' }}>{group.emoji}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{group.title}</h3>
                <p className="text-gray-600 text-sm">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
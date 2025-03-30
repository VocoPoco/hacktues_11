export const Dashboard1 = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
    <aside className="w-full lg:w-64 bg-white p-6 border-b lg:border-b-0 lg:border-r border-gold-500/20">
      <div className="text-2xl font-playfair text-gold-500 mb-8">Workspace</div>
      <nav className="space-y-4">
        {['Projects', 'Analytics', 'Billing', 'Settings'].map(item => (
          <a key={item} href="#" className="block text-gray-600 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500">
            {item}
          </a>
        ))}
      </nav>
    </aside>
    <main className="flex-1 p-6 sm:p-12">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl">Active Projects</h1>
          <button type="button" className="bg-gold-500 px-6 py-2 sm:px-8 sm:py-3 text-white rounded-lg hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500">
            + New Project
          </button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4" aria-hidden="true" />
              <div className="flex justify-between items-center">
                <h3 className="font-cormorant text-lg">Project {i}</h3>
                <button type="button" className="p-2 hover:bg-gold-500/10 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500">
                  <EditIcon className="w-5 h-5 text-gold-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export const Dashboard2 = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
    <aside className="w-full lg:w-72 bg-gray-800 p-6 border-b lg:border-b-0 lg:border-r border-gold-500/20">
      <div className="text-xl font-playfair text-gold-500 mb-8">Navigation</div>
      <nav className="space-y-4">
        {['Projects', 'Activity', 'Team', 'Billing'].map(item => (
          <a key={item} href="#" className="block text-gray-400 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500">
            {item}
          </a>
        ))}
      </nav>
    </aside>
    <main className="flex-1 p-6 sm:p-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-4 rounded-xl">
            <div className="text-sm text-gold-500">Active Projects</div>
            <div className="text-2xl font-playfair">12</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <div className="text-sm text-gold-500">Storage Used</div>
            <div className="text-2xl font-playfair">64%</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-playfair text-xl text-white">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg">
                <div className="w-8 h-8 bg-gold-500/10 rounded-full flex items-center justify-center" aria-hidden="true">◆</div>
                <div className="flex-1">
                  <div className="font-cormorant text-sm text-white">Project {i} Updated</div>
                  <div className="text-xs text-gray-400">2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

export const Dashboard3 = () => (
  <div className="min-h-screen bg-ivory-50 flex">
    <aside className="w-64 bg-white p-6 border-r border-gold-500/20">
      <div className="text-2xl font-playfair text-gold-500 mb-8">Menu</div>
      <nav className="space-y-4">
        {['Dashboard', 'Projects', 'Clients', 'Reports'].map(item => (
          <a key={item} href="#" className="block text-gray-600 hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500">
            {item}
          </a>
        ))}
      </nav>
    </aside>
    <main className="flex-1 p-6 sm:p-12">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl">Welcome Back</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
            <h2 className="font-playfair text-xl mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="p-4 bg-gray-50 hover:bg-gold-500/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500">
                New Project
              </button>
              <button type="button" className="p-4 bg-gray-50 hover:bg-gold-500/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500">
                View Analytics
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
            <h2 className="font-playfair text-xl mb-4">Subscription</h2>
            <div className="bg-gold-500/10 p-4 rounded-xl">
              <div className="text-gold-500 text-xs sm:text-sm">Premium Plan</div>
              <div className="text-2xl sm:text-3xl font-playfair mt-2">$500/mo</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export const Dashboard4 = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto p-6 sm:p-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl">Project Portfolio</h1>
        <button type="button" className="bg-gold-500 px-6 py-2 text-white rounded-lg hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500">
          + New Site
        </button>
      </div>
      <div className="grid gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-xl" aria-hidden="true" />
              <div className="flex-1">
                <h3 className="font-playfair text-xl mb-2">Project {i}</h3>
                <div className="flex gap-4">
                  <div className="text-xs sm:text-sm bg-gold-500/10 px-3 py-1 rounded-full">In Progress</div>
                  <div className="text-xs sm:text-sm text-gray-500">Last updated 2d ago</div>
                </div>
              </div>
              <button type="button" className="p-3 hover:bg-gold-500/10 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500">
                <EditIcon className="w-5 h-5 text-gold-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Dashboard5 = () => (
  <div className="min-h-screen bg-gray-900 p-6 sm:p-12">
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-gray-800 p-6 rounded-2xl">
          <div className="text-gold-500 mb-2 text-xs sm:text-sm">Active Projects</div>
          <div className="text-3xl font-playfair">8</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl">
          <div className="text-gold-500 mb-2 text-xs sm:text-sm">Storage Used</div>
          <div className="text-3xl font-playfair">82%</div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-xl text-white">Recent Projects</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-900/50 rounded-xl p-4 hover:bg-gray-900 transition-colors">
              <div className="aspect-square bg-gray-800 rounded-lg mb-3" aria-hidden="true" />
              <div className="text-white text-sm">Project {i}</div>
              <div className="text-xs text-gray-400">Web Design</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

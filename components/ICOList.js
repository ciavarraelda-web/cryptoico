import { useState } from 'react';

export default function ICOList({ data }) {
  const [activeTab, setActiveTab] = useState('icos');
  
  // Dati di esempio per i banner (dovranno essere sostituiti con dati reali dal database)
  const bannerData = [
    {
      id: 1,
      title: "Premium Crypto Wallet",
      image: "/images/banner1.jpg",
      url: "https://example.com/wallet",
      description: "Secure your crypto assets with our premium wallet solution"
    },
    {
      id: 2,
      title: "Crypto Trading Platform",
      image: "/images/banner2.jpg",
      url: "https://example.com/trading",
      description: "Start trading with low fees and advanced tools"
    }
  ];

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-medium text-gray-600">No ICO listings available yet</h3>
        <p className="mt-2 text-gray-500">Be the first to submit an ICO!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sezione principale ICO */}
      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">ICO Listings</h2>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'icos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('icos')}
            >
              ICOs
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'ended' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('ended')}
            >
              Ended
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((ico, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {ico.image && (
                <img 
                  src={ico.image} 
                  alt={ico.name} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{ico.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{ico.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
                    {ico.status}
                  </span>
                  {ico.category && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
                      {ico.category}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <a 
                    href={ico.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Visit Website
                  </a>
                  <span className="text-xs text-gray-500">
                    Ends: {new Date(ico.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar per i banner */}
      <div className="lg:w-1/4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Advertisement Banners</h3>
          <div className="space-y-4">
            {bannerData.map((banner) => (
              <a
                key={banner.id}
                href={banner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-gray-100 rounded-lg p-3 border border-gray-200 group-hover:border-blue-300 transition-colors">
                  <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-500">Banner Image</span>
                    {/* Sostituisci con <img src={banner.image} alt={banner.title} /> quando hai le immagini reali */}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{banner.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{banner.description}</p>
                </div>
              </a>
            ))}
          </div>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
            Advertise Here
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Submit Your ICO</h3>
          <p className="text-gray-600 text-sm mb-4">
            List your ICO project on our platform and reach thousands of potential investors.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
            Submit ICO - $299
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ICOList({ data, banners }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(ico => (
        <div key={ico._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition">
          <h2 className="text-lg font-bold mb-2">{ico.name}</h2>
          <p className="text-gray-700 mb-2">{ico.description}</p>
          <a href={ico.website} target="_blank" rel="noopener noreferrer" className="mt-auto text-blue-600 hover:underline">
            Visit Website
          </a>
        </div>
      ))}

      {banners.map(banner => (
        <div key={banner._id} className="bg-green-50 shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition">
          <h2 className="text-lg font-bold mb-2">{banner.title}</h2>
          {banner.image && <img src={banner.image} alt={banner.title} className="w-full h-48 object-cover rounded mb-2" />}
          <a href={banner.url} target="_blank" rel="noopener noreferrer" className="mt-auto text-blue-600 hover:underline">
            Visit
          </a>
        </div>
      ))}
    </div>
  )
}

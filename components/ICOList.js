export default function ICOList({ data, banners }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(ico => (
        <div key={ico._id} className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-bold">{ico.name}</h2>
          <p>{ico.description}</p>
          <a href={ico.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 block">Visit Website</a>
        </div>
      ))}

      {banners.map(banner => (
        <div key={banner._id} className="bg-green-50 shadow-md rounded p-4">
          <h2 className="text-lg font-bold">{banner.title}</h2>
          {banner.image && <img src={banner.image} alt={banner.title} className="w-full h-32 object-cover mt-2 rounded" />}
          <a href={banner.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 block">Visit</a>
        </div>
      ))}
    </div>
  )
}

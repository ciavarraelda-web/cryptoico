export default function ICOList({ data }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-medium text-gray-600">No ICO listings available yet</h3>
        <p className="mt-2 text-gray-500">Be the first to submit an ICO!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((ico, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">{ico.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{ico.description}</p>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
                {ico.status}
              </span>
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
              <span className="text-xs text-gray-500">Ends: {new Date(ico.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

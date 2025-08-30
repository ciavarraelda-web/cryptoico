export default function NewsSection({ data }) {
  // Limit to 6 news items
  const newsItems = data.slice(0, 6)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map((article, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {article.urlToImage && (
            <img 
              src={article.urlToImage} 
              alt={article.title} 
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Read more →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

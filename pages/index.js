import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

export default function Home() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=crypto&language=en&pageSize=6&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
        const data = await res.json()
        setNews(data.articles || [])
      } catch (err) {
        console.error("Failed to fetch news:", err)
      }
    }
    fetchNews()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CryptoICO - Home</title>
        <meta name="description" content="CryptoICO - Latest ICOs and Crypto News" />
      </Head>

      <Header />

      <main className="container mx-auto py-12 px-4">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CryptoICO</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">Browse the latest ICOs and crypto news. Submit your ICO or advertise your project today!</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Crypto News</h2>
          {news.length === 0 ? (
            <p className="text-gray-500">Loading news...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
                  {item.urlToImage && (
                    <img src={item.urlToImage} alt={item.title} className="h-48 w-full object-cover" />
                  )}
                  <div className="p-4 flex flex-col justify-between h-full">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm mb-4">{item.description?.slice(0, 100)}...</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-auto">Read More</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

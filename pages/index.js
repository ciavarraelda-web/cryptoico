import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CryptoList from '../components/CryptoList'
import NewsSection from '../components/NewsSection'

export default function Home({ cryptoData, newsData }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CryptoICO - Cryptocurrency News & Prices</title>
        <meta name="description" content="Latest cryptocurrency news, prices and ICO listings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-2">CryptoICO</h1>
          <p className="text-xl text-center text-gray-600 mb-8">
            Latest cryptocurrency news, prices and ICO listings
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Cryptocurrencies</h2>
          <CryptoList data={cryptoData} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Crypto News</h2>
          <NewsSection data={newsData} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  let cryptoData = []
  let newsData = []

  try {
    const cryptoRes = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    )
    if (cryptoRes.ok) {
      cryptoData = await cryptoRes.json()
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error)
  }

  try {
    const newsRes = await fetch(
      `https://newsapi.org/v2/everything?q=cryptocurrency&language=en&sortBy=publishedAt&apiKey=aa53ba1f151d42f5bac01774e792e9ee`
    )
    if (newsRes.ok) {
      const newsResponse = await newsRes.json()
      newsData = newsResponse.articles || []
    }
  } catch (error) {
    console.error('Error fetching news:', error)
  }

  return {
    props: {
      cryptoData,
      newsData
    }
  }
}

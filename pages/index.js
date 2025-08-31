import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import clientPromise from "../lib/mongodb"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay, Navigation, Pagination } from "swiper"

export default function Home({ icos, banners }) {
  const [news, setNews] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [formData, setFormData] = useState({ name: "", website: "", email: "", description: "" })
  const [bannerFormData, setBannerFormData] = useState({ title: "", url: "", image: null, duration: "7" })

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

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleBannerInputChange = (e) => {
    const { id, value } = e.target
    setBannerFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (e) => {
    setBannerFormData(prev => ({ ...prev, image: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/coinbase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ icoData: formData, amount: 299, type: "ico" })
    })
    const charge = await response.json()
    if (charge?.hosted_url) window.location.href = charge.hosted_url
  }

  const handleBannerSubmit = async (e) => {
    e.preventDefault()
    const amount = bannerFormData.duration === "7" ? 99 : bannerFormData.duration === "14" ? 179 : 299
    const response = await fetch("/api/coinbase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bannerData: bannerFormData, amount, type: "banner" })
    })
    const charge = await response.json()
    if (charge?.hosted_url) window.location.href = charge.hosted_url
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CryptoICO - Home</title>
      </Head>

      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-24 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-6">
          Discover the Latest ICOs & Crypto News
        </motion.h1>
        <motion.div className="flex justify-center gap-4">
          <button onClick={() => setShowModal(true)} className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg">Submit ICO</button>
          <button onClick={() => setShowBannerModal(true)} className="bg-green-700 text-white font-bold py-3 px-6 rounded-lg">Advertise Banner</button>
        </motion.div>
      </section>

      <main className="container mx-auto py-12 px-4 space-y-16">
        {/* ICO Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Recent ICOs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {icos.map(ico => (
              <motion.div key={ico._id} whileHover={{ scale: 1.03 }} className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold mb-2">{ico.name}</h3>
                <p className="text-gray-700 mb-4">{ico.description}</p>
                <a href={ico.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Banner Slider */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Active Banners</h2>
          <Swiper modules={[Autoplay, Navigation, Pagination]} spaceBetween={20} slidesPerView={1} loop autoplay={{ delay: 4000 }} navigation pagination={{ clickable: true }}>
            {banners.map(banner => (
              <SwiperSlide key={banner._id}>
                <div className="relative bg-green-50 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                  {banner.image && <img src={banner.image} alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />}
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{banner.title}</h3>
                    <a href={banner.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white underline mt-2 inline-block">Visit</a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* News */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Latest Crypto News</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index*0.1 }} className="bg-white shadow-lg rounded-lg overflow-hidden">
                {item.urlToImage && <img src={item.urlToImage} alt={item.title} className="h-48 w-full object-cover" />}
                <div className="p-4 flex flex-col justify-between h-full">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{item.description?.slice(0,100)}...</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-auto">Read More</a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      {showModal && <ModalICO formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} close={() => setShowModal(false)} />}
      {showBannerModal && <ModalBanner formData={bannerFormData} handleInputChange={handleBannerInputChange} handleImageChange={handleImageChange} handleSubmit={handleBannerSubmit} close={() => setShowBannerModal(false)} />}
    </div>
  )
}

// Server-side props
export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("cryptoico")
    const icos = await db.collection("icos").find({ approved:true }).sort({ createdAt:-1 }).limit(6).toArray()
    const banners = await db.collection("banners").find({ approved:true, endDate: { $gt: new Date() }}).sort({createdAt:-1}).limit(6).toArray()
    return { props: { icos: JSON.parse(JSON.stringify(icos)), banners: JSON.parse(JSON.stringify(banners)) } }
  } catch { return { props: { icos: [], banners: [] } } }
}

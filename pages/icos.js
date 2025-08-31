import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ModalICO from "../components/ModalICO"
import ModalBanner from "../components/ModalBanner"
import clientPromise from "../lib/mongodb"
import { useState } from "react"

export default function ICOs({ icos, banners }) {
  const [showModal, setShowModal] = useState(false)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("ico")

  const [formData, setFormData] = useState({ name: "", website: "", email: "", description: "" })
  const [bannerFormData, setBannerFormData] = useState({ title: "", url: "", image: null, duration: "7" })

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
    try {
      const response = await fetch("/api/coinbase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ icoData: formData, amount: 299, type: "ico" })
      })
      const charge = await response.json()
      if (charge?.hosted_url) window.location.href = charge.hosted_url
    } catch (err) {
      console.error(err)
      alert("Errore durante il pagamento")
    }
  }

  const handleBannerSubmit = async (e) => {
    e.preventDefault()
    try {
      const amount = bannerFormData.duration === "7" ? 99 : bannerFormData.duration === "14" ? 179 : 299
      const response = await fetch("/api/coinbase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bannerData: bannerFormData, amount, type: "banner" })
      })
      const charge = await response.json()
      if (charge?.hosted_url) window.location.href = charge.hosted_url
    } catch (err) {
      console.error(err)
      alert("Errore durante il pagamento banner")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CryptoICO - ICO Listings</title>
      </Head>

      <Header />

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ICO Listings</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => { setSelectedPackage("ico"); setShowModal(true) }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit ICO
            </button>
            <button
              onClick={() => { setSelectedPackage("banner"); setShowBannerModal(true) }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Advertise Banner
            </button>
          </div>
        </div>

        {/* Lista ICO */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {icos.map(ico => (
            <div key={ico._id} className="bg-white rounded-lg p-6 shadow hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">{ico.name}</h3>
              <p className="text-gray-700 mb-4">{ico.description}</p>
              <a href={ico.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
            </div>
          ))}
        </div>

        {/* Lista Banner */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {banners.map(banner => (
            <div key={banner._id} className="relative bg-green-50 rounded-lg overflow-hidden h-48 flex items-center justify-center shadow">
              {banner.image && <img src={banner.image} alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{banner.title}</h3>
                <a href={banner.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white underline mt-2 inline-block">Visit</a>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        {showModal && (
          <ModalICO
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            close={() => setShowModal(false)}
          />
        )}

        {showBannerModal && (
          <ModalBanner
            formData={bannerFormData}
            handleInputChange={handleBannerInputChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleBannerSubmit}
            close={() => setShowBannerModal(false)}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

// Server-side props
export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("cryptoico")
    const icos = await db.collection("icos").find({ approved:true }).sort({ createdAt:-1 }).toArray()
    const banners = await db.collection("banners").find({ approved:true, endDate: { $gt: new Date() }}).sort({createdAt:-1}).toArray()
    return { props: { icos: JSON.parse(JSON.stringify(icos)), banners: JSON.parse(JSON.stringify(banners)) } }
  } catch {
    return { props: { icos: [], banners: [] } }
  }
}

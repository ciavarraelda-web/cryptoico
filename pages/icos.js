import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ICOList from '../components/ICOList'
import { useState } from 'react'
import clientPromise from '../lib/mongodb'

export default function ICOs({ icos, banners }) {
  const [showModal, setShowModal] = useState(false)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
    email: ''
  })
  const [bannerFormData, setBannerFormData] = useState({
    title: '',
    url: '',
    image: null,
    duration: '7'
  })
  const [selectedPackage, setSelectedPackage] = useState('ico')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Invia i dati al backend per processare il pagamento
      const response = await fetch('/api/coinbase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          icoData: formData,
          amount: selectedPackage === 'ico' ? 299 : 99,
          type: selectedPackage
        }),
      })
      
      const charge = await response.json()
      
      if (charge && charge.hosted_url) {
        // Reindirizza l'utente alla pagina di pagamento di Coinbase
        window.location.href = charge.hosted_url
      }
    } catch (error) {
      console.error('Error creating charge:', error)
      alert('Error processing payment. Please try again.')
    }
  }

  const handleBannerSubmit = async (e) => {
    e.preventDefault()
    try {
      // Invia i dati del banner al backend
      const response = await fetch('/api/coinbase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bannerData: bannerFormData,
          amount: bannerFormData.duration === '7' ? 99 : bannerFormData.duration === '14' ? 179 : 299,
          type: 'banner'
        }),
      })
      
      const charge = await response.json()
      
      if (charge && charge.hosted_url) {
        window.location.href = charge.hosted_url
      }
    } catch (error) {
      console.error('Error creating banner charge:', error)
      alert('Error processing banner payment. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleBannerInputChange = (e) => {
    const { id, value } = e.target
    setBannerFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleImageChange = (e) => {
    setBannerFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CryptoICO - ICO Listings</title>
        <meta name="description" content="Browse and submit ICO listings" />
      </Head>

      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ICO Listings</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                setSelectedPackage('ico')
                setShowModal(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit ICO
            </button>
            <button 
              onClick={() => {
                setSelectedPackage('banner')
                setShowBannerModal(true)
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Advertise Banner
            </button>
          </div>
        </div>

        <ICOList data={icos} banners={banners} />
        
        {/* Modal per ICO Submission */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Submit New ICO - $299</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">ICO Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="website">Website URL *</label>
                  <input 
                    type="url" 
                    id="website" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">Contact Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="description">Description *</label>
                  <textarea 
                    id="description" 
                    rows="4" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Pay with Crypto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal per Banner Advertisement */}
        {showBannerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Advertise Banner</h2>
              <form onSubmit={handleBannerSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="title">Banner Title *</label>
                  <input 
                    type="text" 
                    id="title" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                    onChange={handleBannerInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="url">Destination URL *</label>
                  <input 
                    type="url" 
                    id="url" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                    onChange={handleBannerInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="duration">Duration *</label>
                  <select 
                    id="duration" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                    onChange={handleBannerInputChange}
                  >
                    <option value="7">7 Days - $99</option>
                    <option value="14">14 Days - $179</option>
                    <option value="30">30 Days - $299</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="image">Banner Image *</label>
                  <input 
                    type="file" 
                    id="image" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    accept="image/*" 
                    required 
                    onChange={handleImageChange}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setShowBannerModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Pay with Crypto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("cryptoico")
    
    // Fetch approved ICOs
    const icos = await db.collection("icos")
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .toArray()
    
    // Fetch active banners
    const banners = await db.collection("banners")
      .find({ 
        approved: true, 
        endDate: { $gt: new Date() } 
      })
      .sort({ createdAt: -1 })
      .toArray()

    return {
      props: {
        icos: JSON.parse(JSON.stringify(icos)),
        banners: JSON.parse(JSON.stringify(banners))
      }
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return {
      props: {
        icos: [],
        banners: []
      }
    }
  }
}

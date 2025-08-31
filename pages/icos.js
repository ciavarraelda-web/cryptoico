import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ICOList from '../components/ICOList'
import { useState } from 'react'
import clientPromise from '../lib/mongodb'
import { useDropzone } from 'react-dropzone'

export default function ICOs({ icos, banners }) {
  const [showModal, setShowModal] = useState(false)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', website: '', description: '', email: '' })
  const [bannerFormData, setBannerFormData] = useState({ title: '', url: '', image: null, duration: '7' })
  const [bannerPreview, setBannerPreview] = useState(null)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleBannerInputChange = (e) => {
    const { id, value } = e.target
    setBannerFormData(prev => ({ ...prev, [id]: value }))
  }

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setBannerFormData(prev => ({ ...prev, image: file }))
      setBannerPreview(URL.createObjectURL(file))
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/coinbase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icoData: formData, amount: 299 })
      })
      const charge = await response.json()
      if (charge?.hosted_url) window.location.href = charge.hosted_url
    } catch (error) {
      console.error(error)
      alert('Errore nel pagamento.')
    }
  }

  const handleBannerSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/coinbase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bannerData: bannerFormData,
          amount: bannerFormData.duration === '7' ? 99 : bannerFormData.duration === '14' ? 179 : 299
        })
      })
      const charge = await response.json()
      if (charge?.hosted_url) window.location.href = charge.hosted_url
    } catch (error) {
      console.error(error)
      alert('Errore nel pagamento banner.')
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
            <button onClick={() => { setShowModal(true) }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit ICO</button>
            <button onClick={() => { setShowBannerModal(true) }} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Advertise Banner</button>
          </div>
        </div>

        <ICOList data={icos} banners={banners} />

        {/* Modale ICO */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Submit New ICO - $299</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">ICO Name *</label>
                  <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" required onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="website" className="block text-gray-700 mb-2">Website URL *</label>
                  <input type="url" id="website" className="w-full p-2 border border-gray-300 rounded" required onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Contact Email *</label>
                  <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" required onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 mb-2">Description *</label>
                  <textarea id="description" rows="4" className="w-full p-2 border border-gray-300 rounded" required onChange={handleInputChange}></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pay with Crypto</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modale Banner */}
        {showBannerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Advertise Banner</h2>
              <form onSubmit={handleBannerSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 mb-2">Banner Title *</label>
                  <input type="text" id="title" className="w-full p-2 border border-gray-300 rounded" required onChange={handleBannerInputChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="url" className="block text-gray-700 mb-2">Destination URL *</label>
                  <input type="url" id="url" className="w-full p-2 border border-gray-300 rounded" required onChange={handleBannerInputChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="duration" className="block text-gray-700 mb-2">Duration *</label>
                  <select id="duration" className="w-full p-2 border border-gray-300 rounded" onChange={handleBannerInputChange}>
                    <option value="7">7 Days - $99</option>
                    <option value="14">14 Days - $179</option>
                    <option value="30">30 Days - $299</option>
                  </select>
                </div>

                <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer text-center mb-4">
                  <input {...getInputProps()} required />
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Preview" className="mx-auto h-40 object-contain" />
                  ) : (
                    <p>Trascina qui l'immagine o clicca per selezionarla</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowBannerModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Pay with Crypto</button>
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
    const icos = await db.collection("icos").find({ approved: true }).sort({ createdAt: -1 }).toArray()
    const banners = await db.collection("banners").find({ approved: true, endDate: { $gt: new Date() } }).sort({ createdAt: -1 }).toArray()
    return { props: { icos: JSON.parse(JSON.stringify(icos)), banners: JSON.parse(JSON.stringify(banners)) } }
  } catch (err) {
    console.error(err)
    return { props: { icos: [], banners: [] } }
  }
}

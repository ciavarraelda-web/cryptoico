import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ICOList from '../components/ICOList'
import { useState } from 'react'

export default function ICOs({ icos }) {
  const [showModal, setShowModal] = useState(false)

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
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit ICO
          </button>
        </div>

        <ICOList data={icos} />
        
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Submit New ICO</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">ICO Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="website">Website</label>
                  <input 
                    type="url" 
                    id="website" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                  <textarea 
                    id="description" 
                    rows="4" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    required 
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
                    Continue to Payment
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
  // Connect to MongoDB and fetch ICOs
  // This is a placeholder - you'll need to implement your database connection
  let icos = []
  
  try {
    // Example with MongoDB (you'll need to set up your database)
    // const client = await mongoose.connect(process.env.MONGODB_URI)
    // const db = client.connection.db
    // icos = await db.collection('icos').find({ approved: true }).toArray()
  } catch (error) {
    console.error('Failed to fetch ICOs:', error)
  }

  return {
    props: {
      icos: JSON.parse(JSON.stringify(icos)) // Convert to plain objects
    }
  }
}

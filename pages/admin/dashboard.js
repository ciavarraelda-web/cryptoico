import { useEffect, useState } from "react"
import clientPromise from "../../lib/mongodb"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function AdminDashboard({ initialICOs }) {
  const [icos, setIcos] = useState(initialICOs)

  const approveICO = async (id) => {
    try {
      const res = await fetch(`/api/icos/${id}/approve`, { method: "PATCH" })
      if (res.ok) {
        setIcos(icos.filter(ico => ico._id !== id))
        alert("ICO approvata!")
      }
    } catch (err) {
      console.error(err)
      alert("Errore durante l'approvazione.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Pending ICOs</h1>
        {icos.length === 0 ? (
          <p>Nessuna ICO in attesa di approvazione.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {icos.map(ico => (
              <div key={ico._id} className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold">{ico.name}</h2>
                  <p className="text-gray-700">{ico.description}</p>
                  <p className="text-gray-500 text-sm mt-1">{ico.website}</p>
                </div>
                <button
                  onClick={() => approveICO(ico._id)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Approve
                </button>
              </div>
            ))}
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
    const icos = await db.collection("icos").find({ approved: false }).sort({ createdAt: -1 }).toArray()
    return { props: { initialICOs: JSON.parse(JSON.stringify(icos)) } }
  } catch (err) {
    console.error(err)
    return { props: { initialICOs: [] } }
  }
}

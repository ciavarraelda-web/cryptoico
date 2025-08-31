// pages/api/coinbase.js
import { Client, resources } from "coinbase-commerce-node"
const { Charge } = resources

// Inizializza il client Coinbase
Client.init(process.env.COINBASE_API_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { icoData, bannerData, amount, type } = req.body

    if ((!icoData && !bannerData) || !amount || !type) {
      return res.status(400).json({ error: "Missing parameters" })
    }

    // Prepara il metadata
    let metadata = { type, tempId: Date.now() }
    if (type === "banner") metadata.duration = bannerData.duration || "7"

    // Configura il charge
    const chargeData = {
      name: type === "ico" ? `ICO Listing: ${icoData.name}` : `Banner: ${bannerData.title}`,
      description: type === "ico" ? `Payment for listing ${icoData.name}` : `Payment for banner ${bannerData.title}`,
      local_price: { amount: amount.toString(), currency: "USD" },
      pricing_type: "fixed_price",
      metadata
    }

    // Crea il charge su Coinbase
    const charge = await Charge.create(chargeData)

    res.status(200).json(charge)
  } catch (err) {
    console.error("Coinbase API error:", err)
    res.status(500).json({ error: "Internal server error" })
  }
}

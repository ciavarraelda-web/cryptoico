// pages/api/coinbase.js
import { Client, resources } from "coinbase-commerce-node"
const { Charge } = resources
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

    const chargeData = {
      name: type === "ico" ? `ICO Listing: ${icoData.name}` : `Banner: ${bannerData.title}`,
      description: type === "ico" ? `Payment for listing ${icoData.name}` : `Payment for banner ${bannerData.title}`,
      local_price: { amount: amount.toString(), currency: "USD" },
      pricing_type: "fixed_price",
      metadata: { type, tempId: Date.now() }
    }

    const charge = await Charge.create(chargeData)
    res.status(200).json(charge)
  } catch (error) {
    console.error("Coinbase API error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

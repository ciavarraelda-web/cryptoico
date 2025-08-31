import { Client, resources } from "coinbase-commerce-node"
const { Charge } = resources

Client.init(process.env.COINBASE_API_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    const { icoData, bannerData, amount } = req.body
    const data = icoData || bannerData
    if (!data || !amount) return res.status(400).json({ error: "Missing parameters" })

    const chargeData = {
      name: icoData ? `ICO: ${icoData.name}` : `Banner: ${bannerData.title}`,
      description: icoData ? `Payment for ${icoData.name}` : `Banner payment ${bannerData.title}`,
      local_price: { amount: amount.toString(), currency: 'USD' },
      pricing_type: 'fixed_price',
      metadata: { ...data, type: icoData ? 'ico_listing' : 'banner' },
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`
    }

    const charge = await Charge.create(chargeData)
    res.status(200).json(charge)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

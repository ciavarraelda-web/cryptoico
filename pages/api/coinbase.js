const CoinbaseCommerce = require('coinbase-commerce-node')
const Client = CoinbaseCommerce.Client
const Charge = CoinbaseCommerce.resources.Charge

// Initialize client with API key
Client.init(process.env.COINBASE_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { icoData, amount } = req.body

    if (!icoData || !amount) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    const chargeData = {
      name: `ICO Listing: ${icoData.name}`,
      description: `Payment for listing ${icoData.name} on CryptoICO`,
      local_price: {
        amount: amount.toString(),
        currency: 'USD'
      },
      pricing_type: 'fixed_price',
      metadata: {
        ico_id: icoData._id || icoData.tempId,
        type: 'ico_listing'
      }
    }

    const charge = await Charge.create(chargeData)
    
    res.status(200).json(charge)
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

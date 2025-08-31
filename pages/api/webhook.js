import clientPromise from '../../lib/mongodb'
import crypto from 'crypto'

export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const rawBody = await getRawBody(req)
    const signature = req.headers['x-cc-webhook-signature']
    const digest = crypto.createHmac('sha256', process.env.COINBASE_WEBHOOK_SECRET).update(rawBody).digest('hex')
    if (digest !== signature) return res.status(401).json({ error: 'Invalid signature' })

    const event = JSON.parse(rawBody)
    console.log('Webhook event:', event.type)

    const client = await clientPromise
    const db = client.db('cryptoico')

    if (event.type === 'charge:confirmed') {
      const data = event.data.metadata
      const collection = data.type === 'ico_listing' ? 'icos' : 'banners'
      await db.collection(collection).insertOne({ ...data, approved: false, createdAt: new Date(), endDate: data.duration ? new Date(Date.now() + data.duration*24*60*60*1000) : null })
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

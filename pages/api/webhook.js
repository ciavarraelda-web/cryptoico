export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const signature = req.headers['x-cc-webhook-signature']
    const rawBody = JSON.stringify(req.body)

    // Verify the webhook signature
    const crypto = require('crypto')
    const secret = process.env.COINBASE_WEBHOOK_SECRET
    
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(rawBody).digest('hex')
    
    if (digest !== signature) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = req.body
    console.log('Received webhook event:', event.type)

    // Handle different event types
    switch (event.type) {
      case 'charge:confirmed':
        // Update database to mark payment as confirmed
        // and activate the ICO listing
        console.log('Payment confirmed for:', event.data.metadata.ico_id)
        break
        
      case 'charge:failed':
        // Update database to mark payment as failed
        console.log('Payment failed for:', event.data.metadata.ico_id)
        break
        
      default:
        console.log('Unhandled event type:', event.type)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

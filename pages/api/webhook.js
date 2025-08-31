// pages/api/webhook.js
import { MongoClient } from "mongodb"
import crypto from "crypto"

const client = new MongoClient(process.env.MONGODB_URI)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // Verifica firma webhook
    const signature = req.headers["x-cc-webhook-signature"]
    const rawBody = JSON.stringify(req.body)
    const hmac = crypto.createHmac("sha256", process.env.COINBASE_WEBHOOK_SECRET)
    const digest = hmac.update(rawBody).digest("hex")

    if (digest !== signature) {
      return res.status(401).json({ error: "Invalid signature" })
    }

    const event = req.body
    console.log("Webhook event:", event.type)

    await client.connect()
    const db = client.db("cryptoico")

    switch (event.type) {
      case "charge:confirmed":
        // Verifica se è ICO o Banner
        if (event.data.metadata.type === "ico") {
          await db.collection("icos").insertOne({
            name: event.data.name,
            website: event.data.description,
            approved: true,
            createdAt: new Date()
          })
          console.log("ICO approved:", event.data.name)
        } else if (event.data.metadata.type === "banner") {
          const durationDays = event.data.metadata.duration ? parseInt(event.data.metadata.duration) : 7
          await db.collection("banners").insertOne({
            title: event.data.name,
            url: event.data.description,
            approved: true,
            createdAt: new Date(),
            endDate: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000) // durata banner
          })
          console.log("Banner approved:", event.data.name, "Duration:", durationDays)
        }
        break

      case "charge:failed":
        console.log("Payment failed:", event.data.metadata)
        break

      default:
        console.log("Unhandled event type:", event.type)
    }

    res.status(200).json({ received: true })
  } catch (err) {
    console.error("Webhook error:", err)
    res.status(500).json({ error: "Internal server error" })
  }
}

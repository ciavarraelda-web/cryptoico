import clientPromise from "../../lib/mongodb"
import crypto from "crypto"

export const config = {
  api: {
    bodyParser: false, // Coinbase vuole raw body
  },
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", chunk => (data += chunk))
    req.on("end", () => resolve(data))
    req.on("error", reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const rawBody = await getRawBody(req)
    const signature = req.headers["x-cc-webhook-signature"]

    const secret = process.env.COINBASE_WEBHOOK_SECRET
    const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex")

    if (digest !== signature) {
      return res.status(401).json({ error: "Invalid signature" })
    }

    const event = JSON.parse(rawBody)
    console.log("🔔 Webhook event received:", event.type)

    const client = await clientPromise
    const db = client.db("cryptoico")

    switch (event.type) {
      case "charge:confirmed": {
        const icoData = event.data.metadata

        await db.collection("icos").insertOne({
          ...icoData,
          approved: false, // admin può approvare dopo
          createdAt: new Date(),
        })

        console.log("✅ ICO inserita nel DB:", icoData.name)
        break
      }

      case "charge:failed":
        console.log("❌ Payment failed for:", event.data.metadata.name)
        break

      default:
        console.log("ℹ️ Event type not handled:", event.type)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

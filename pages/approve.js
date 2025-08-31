import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { id } = req.query
    const client = await clientPromise
    const db = client.db('cryptoico')
    const result = await db.collection('icos').updateOne({ _id: new ObjectId(id) }, { $set: { approved: true, approvedAt: new Date() } })
    if (result.matchedCount === 0) return res.status(404).json({ error: 'ICO not found' })
    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

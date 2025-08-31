import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  // In dev mode usa global per evitare troppi client
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In produzione una sola connessione
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise

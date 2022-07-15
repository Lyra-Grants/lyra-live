import { Db, MongoClient } from 'mongodb'

let cachedClient: MongoClient, cachedDB: Db

const uri = process.env.MONGODB_URI ?? ''
const dbName = process.env.MONGODB_DB_NAME ?? ''

if (uri === '') throw new Error('Please add your Mongo URI to .env')
if (dbName === '') throw new Error('Please add your Mongo DB name to .env')

export async function connectToDB() {
  if (cachedClient && cachedDB) return { client: cachedClient, db: cachedDB }

  const client: MongoClient = await MongoClient.connect(uri)
  const db: Db = client.db(dbName)

  cachedClient = client
  cachedDB = db

  return { client, db }
}
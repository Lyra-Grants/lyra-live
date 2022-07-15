import type {
  NextApiRequest as NAReq,
  NextApiResponse as NARes
} from 'next'
import { Position } from '@lyrafinance/lyra-js'

import { lyra } from '@/src/lib/lyra'
import { connectToDB } from '@/src/lib/mongodb'


export default async function positions(req: NAReq, res: NARes): Promise<void> {
  const account = req.body
  const positions: Position[] = await lyra.positions(account)

  res.status(200).json(positions)

  // const { db } = await connectToDB()
  // // const result = db.collection('positions').insertOne(positions)
}

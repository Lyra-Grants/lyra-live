import type {
  NextApiRequest as NAReq,
  NextApiResponse as NARes
} from 'next'
// import { gql, useQuery } from '@apollo/client'
import { lyra } from '@/src/lib/lyra'
import { Position } from '@lyrafinance/lyra-js'

import { connectToDB } from '@/src/lib/mongodb'
// import { TradesQueryType, GET_TRADES } from '../../lib/graphql/queries'
// import { apolloClient } from '../../lib/graphql/apollo'


export default async function positions(req: NAReq, res: NARes): Promise<void> {
  const account = req.body
  const positions: Position[] = await lyra.positions(account)

  res.status(200).json(positions)

  // const { db } = await connectToDB()
  // // const result = db.collection('positions').insertOne(positions)
}

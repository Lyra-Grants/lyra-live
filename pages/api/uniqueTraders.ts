import type {
  NextApiRequest as NAReq,
  NextApiResponse as NARes
} from 'next'
import { gql, useQuery } from '@apollo/client'
import { Position } from '@lyrafinance/lyra-js'

// import { connectToDB } from '@/src/lib/mongodb'
import { apolloClient } from '@/src/lib/graphql/apollo'
import { TradesQueryType, GET_TRADES } from '@/src/lib/graphql/queries'


export default async function uT(req: NAReq, res: NARes): Promise<void> {
  let lastID = '',
    json: any,
    dfq: any = [], // stands for _d_ata _f_rom _q_uery
    queryName = 'trades',
    exhaustiveData: TradesQueryType[] = [],
    uniqueAccounts: string[] = []

  while (lastID !== undefined) {
    json = await apolloClient.query({  // make new query using `lastID`
      query: GET_TRADES,
      variables: { lastID }
    })
    dfq = json?.data[queryName]

    exhaustiveData.push(dfq) // store queried data

    const lastEntry = dfq[dfq.length - 1]
    lastID = lastEntry?.id // set `lastID` to `id` of last entry from query
  }

  exhaustiveData = exhaustiveData.flat()
  uniqueAccounts = [...new Set(exhaustiveData.map(trade => trade.trader))]

  res.status(200).json(uniqueAccounts)

  // const { db } = await connectToDB()
  // // const result = db.collection('positions').insertOne(positions)
}

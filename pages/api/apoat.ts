import type {
  NextApiRequest as NAReq,
  NextApiResponse as NARes
} from 'next'
// import { gql, useQuery } from '@apollo/client'
import { lyra } from '@/src/lib/lyra'
import { gql, useQuery } from '@apollo/client'
import { Position } from '@lyrafinance/lyra-js'

import { connectToDB } from '@/src/lib/mongodb'
import { apolloClient } from '@/src/lib/graphql/apollo'
import { TradesQueryType, GET_TRADES } from '@/src/lib/graphql/queries'


// _T_rader _p_ositions _t_ype
type TPT = {
  address: string
  positions: Position[]
}


export default async function apoat(req: NAReq, res: NARes): Promise<void> {
  /**
   * @dev Get all unique trader addresses
   */
  let lastID = '',
    json: any,
    dfq: any = [], // stands for _d_ata _f_rom _q_uery
    queryName = 'trades',
    exhaustiveData: TradesQueryType[] = [],
    uniqueAccounts: string[] = [],
    apoat: TPT[] = [], // `apoat` = _a_ll _p_ositions _o_f _a_ll _t_raders
    tp: TPT = { address: '', positions: [] }

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

  /**
   * @dev Get all positions for each account
   */
  if (uniqueAccounts !== []) {
    let account: string = '', positions: Position[] = []

    for (let i = 0; i < uniqueAccounts.length; i++) {
      account = uniqueAccounts[i]
      positions = await lyra.positions(account)

      if (positions !== undefined) {
        tp.address = account
        tp.positions = positions
      }

      apoat.push(tp)
    }
  }

  res.status(200).json(apoat)

  // const { db } = await connectToDB()
  // const result = db.collection('apoat').insertOne(apoat)
}
